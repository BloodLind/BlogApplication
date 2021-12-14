

using BlogApi.Core.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BlogApi.BlogDatabase.Models
{
    public class Category : IGuidKey
    {
        [Key]
        public Guid Id { get; set; }
      
        public string Name { get; set; }

        public virtual ICollection<Article> Articles { get; set; }
    }
}
