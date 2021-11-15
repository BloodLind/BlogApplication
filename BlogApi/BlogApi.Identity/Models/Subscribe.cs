using BlogApi.Core.Infrastructure.Interfaces;

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogApi.Identity.Models
{
    public class Subscribe : IGuidKey
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public virtual User Subscriber { get; set; }
        public string SubscriberId { get; set; }
        public virtual User Author { get; set; }
        public string AuthorId { get; set; }

    }
}
