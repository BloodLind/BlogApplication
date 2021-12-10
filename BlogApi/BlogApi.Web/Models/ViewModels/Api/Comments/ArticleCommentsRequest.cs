using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogApi.Web.Models.ViewModels.Api.Comments
{
    public class ArticleCommentsRequest
    {
        public string ArticleId { get; set; }
        public int Page { get; set; }
    }
}
