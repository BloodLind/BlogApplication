using BlogApi.Core.Infrastructure.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogApi.BlogDatabase.Models
{
    public class Comment : IGuidKey
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string InnerData { get; set; }
        [Required]
        public Guid ArticleId { get; set; }
        public virtual Article Artice { get; set; }
        [Required]
        public Guid UserId { get; set; }

    }
}
