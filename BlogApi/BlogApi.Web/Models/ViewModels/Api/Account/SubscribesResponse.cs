using BlogApi.BlogDatabase.Models;
using BlogApi.Web.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogApi.Web.Models.ViewModels.Api.Account
{
    public class SubscribesResponse : ResultResponse<IEnumerable<Article>>
    {
        
    }
}
