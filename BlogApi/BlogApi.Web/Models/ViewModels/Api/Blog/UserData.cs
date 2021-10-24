using BlogApi.BlogDatabase.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogApi.Web.Models.ViewModels.Api.Blog
{
    public class UserData
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public UserPhoto UserPhoto { get; set; }
    }
}
