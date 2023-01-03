using EneeWebApi.Models;

namespace EneeWebApi.Repositories
{
    public interface IBranch
    {
        Task<IEnumerable<Branch>> GetAllBranchs();
        Task<bool> DeleteBranch(int? id, int? user_id);

        Task<bool> UpdateBranch(Branch branch, int? user_id);

        Task<bool> InserBranch(Branch branch, int? user_id);

        Task<Branch> GetBranch(int? id);

        Task<IEnumerable<Branch>> FindName(string? Name);

    }
}
