using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogApi.Identity.Models
{
    public class User : IdentityUser
    {
        public virtual ICollection<Subscribe> Subscribers { get; set; }
        
        public virtual ICollection<Subscribe> Subscriptions { get; set; }

        public ICollection<UserRole> UserRoles { get; set; }

    }
}
