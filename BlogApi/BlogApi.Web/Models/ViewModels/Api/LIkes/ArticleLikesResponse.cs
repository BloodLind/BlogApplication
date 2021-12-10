using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogApi.Web.Models.ViewModels.Api.Likes
{
    public class ArticleLikesResponse
    {
        public string ArticleId { get; set; }
        public int LikesCount { get; set; }
        public int DislikesCount { get; set; }
    }
}
