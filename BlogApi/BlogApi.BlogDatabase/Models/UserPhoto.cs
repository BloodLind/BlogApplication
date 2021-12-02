using BlogApi.Core.Infrastructure.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogApi.BlogDatabase.Models
{
    public class UserPhoto : IGuidKey
    {
        [Key]
        public Guid Id { get; set ; }
        public string UserId { get; set; }
        public Guid PhotoId { get; set; }
        public virtual Photo Photo { get; set; }
        public Guid? ProfilePhotoId { get; set; }
        public virtual Photo ProfilePhoto { get; set; }
    }
}
