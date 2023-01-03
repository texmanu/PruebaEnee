using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EneeWebApi.Models
{
    public class Branch
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Administrator_name { get; set; }
        public string Phone { get; set; }
        public string Adress { get; set; }
        public string? Fax { get; set; }
        public int? Order_numbers { get; set; }
        public DateTime Created_at { get; set; }
        public DateTime? Deleted_at { get; set; }
        public int User_id { get; set; }
    }

}
