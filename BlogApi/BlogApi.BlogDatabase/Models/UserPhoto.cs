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
        [Required]
        public string PhotoPath { get; set; }
        public string HeaderPhotoPath { get; set; } = null;
    }
}
