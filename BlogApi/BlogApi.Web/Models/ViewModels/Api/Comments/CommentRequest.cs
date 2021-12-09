using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogApi.Web.Models.ViewModels.Api.Comments
{
    public class CommentRequest
    {
        public string ArticleId { get; set; }
        public string Comment { get; set; }
    }
}
