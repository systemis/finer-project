using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace finner.Models
{
    public class User
    {
        public string Id { get; set; }

        public string LastName { get; set; }

        public string FirstName { get; set; }

        public string HashPassword { get; set; }

        public string Email { get; set; }
    }
}