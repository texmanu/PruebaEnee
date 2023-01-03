namespace EneeWebApi.Models
{
    public class Change_log
    {
        public int Id { get; set; }
        public DateTime Created_at { get; set; }
        public int User_id { get; set; }
        public int Branch_id { get; set; }
        public int Change_log_type_id { get; set; }
    }
}
