namespace EneeWebApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Created_at { get; set; }
        public DateTime? Deleted_at { get; set; }

    }
}
