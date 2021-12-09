using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogApi.Web.Models.ViewModels.Api.LIkes
{
    public class LikesResponse
    {
        public string ArticleId { get; set; }
        public string UserId { get; set; }

        public bool IsLiked { get; set; }

    }
}
