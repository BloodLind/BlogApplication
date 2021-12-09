using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogApi.Web.Models.ViewModels.Api.Comments
{
    public class CommentResponse
    {
        public string UserId { get; set; }
        public string Comment { get; set; }
        public string CommentId { get; set; }
    }
}
