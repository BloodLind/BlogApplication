using BlogApi.BlogDatabase.Models;
using BlogApi.Web.Infrastructure.Interfaces;
using System.Collections;
using System.Collections.Generic;

namespace BlogApi.Web.Models.ViewModels.Api.Blog
{
    public class ArticleResponse : Infrastructure.ResultResponse<IEnumerable<Article>>
    {
    
    }
}
