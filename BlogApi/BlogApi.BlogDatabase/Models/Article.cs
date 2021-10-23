using BlogApi.Core.Infrastructure.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogApi.BlogDatabase.Models
{
    public class Article : IGuidKey
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string InnerData { get; set; }
        public Guid? PreviewPhotoId { get; set; } = null;
        public Photo Photo { get; set; }
        public Guid AuthorId { get; set; }
        public DateTime PublicationDate { get; set; }
    }
}
