using Dapper;
using EneeWebApi.Models;
using MySql.Data.MySqlClient;

namespace EneeWebApi.Repositories
{
    public class BranchRepository : IBranch
    {
        private readonly MySqlConfiguration _connectionString;
        public BranchRepository(MySqlConfiguration connectionString)
        {
            _connectionString = connectionString;
        }
        protected MySqlConnection dbConnection()
        {
            return new MySqlConnection(_connectionString.ConnectionString);
        }
        public  Task<IEnumerable<Branch>> GetAllBranchs()
        {
            var db = dbConnection();
            var sql = @"SELECT * FROM branch  WHERE deleted_at is null;";
            return db.QueryAsync<Branch>(sql, new { });
        }
        public Task<Branch> GetBranch(int? id)
        {
            var db = dbConnection();
            var sql = @"SELECT * FROM branch  WHERE id= @Id";
            return db.QueryFirstOrDefaultAsync<Branch>(sql,new { Id=id });
        }
        public Task<IEnumerable<Branch>> FindName(string? name)
        {
            var db = dbConnection();
            var sql = @"SELECT * FROM branch  WHERE name like CONCAT('%',@Name,'%') or administrator_name like CONCAT('%',@Name,'%')";
            return db.QueryAsync<Branch>(sql,  new { Name = name });
        }
        public async Task<bool> UpdateBranch(Branch branch, int? user_id)
        {
            var db = dbConnection();
            var sql = @"UPDATE branch
                        SET name = @Name, 
                            administrator_name = @Administrator_name,
                            phone = @Phone, 
                            address = @Address, 
                            fax = @Fax, 
                            order_numbers = @Order_numbers
                            WHERE id = @Id;";
            var result = await db.ExecuteAsync(sql, new
            { branch.Name, branch.Administrator_name, branch.Phone, branch.Address,branch.Fax, branch.Order_numbers, branch.Id });
            var sql2 = @"INSERT INTO change_log(user_id,branch_id,change_log_type_id)
                        VALUES (@User_id,@Id,1)";
            var result2 = await db.ExecuteAsync(sql2, new
            { user_id, branch.Id });
            return result > 0 && result2 > 0;
        }
        public async Task<bool> DeleteBranch(int? id, int? user_id)
        {
            var db = dbConnection();
            var sql = @"UPDATE branch
                        SET deleted_at = CURRENT_TIMESTAMP
                            WHERE id = @Id;";
            var result = await db.ExecuteAsync(sql, new
            { id });
            var sql2 = @"INSERT INTO change_log(user_id,branch_id,change_log_type_id)
                        VALUES (@User_id,@Id,2)";
            var result2 = await db.ExecuteAsync(sql2, new
            { user_id,id });
            return result > 0 && result2 > 0;
        }
        public async Task<bool> InserBranch(Branch branch, int? user_id)
        {
            var db = dbConnection();
            var sql = @"INSERT INTO branch(name, administrator_name,phone, address, fax, order_numbers, user_id)
                        VALUES(@Name, @Administrator_name,@Phone, @Address, @Fax, @Order_numbers, @User_id)";
            var result = await db.ExecuteAsync(sql, new
            { branch.Name, branch.Administrator_name, branch.Phone, branch.Address, branch.Fax,branch.Order_numbers, branch.User_id });
            return result > 0;
        }
    }
        
}
