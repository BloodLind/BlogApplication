using BlogApi.Core.Infrastructure.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogApi.BlogDatabase.Models
{
    public class Article : IGuidKey
    {
        public Guid Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string InnerData { get; set; }
        public string PhotoPath { get; set; }
        public string PreviewPhotoPath { get; set; } = null;
        public Guid AuthorId { get; set; }
        public DateTime PublicationDate { get; set; }
        public virtual ICollection<Like> Likes { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public int ViewsCount { get; set; }
        public virtual ICollection<Category> Categories { get; set; }

    }
}
