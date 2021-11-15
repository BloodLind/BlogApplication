using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogApi.Web.Models.ViewModels.Api.Blog
{
    public class UserDataResponse
    {
        public int Page {  get; set; }
        public int Total {  get; set; }
        public int Count { get; set; }
        public ICollection<UserData> UserDatas { get; set; }
    }
}
