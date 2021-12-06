
using BlogApi.Core.Infrastructure.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogApi.Web.Models.ViewModels.Api.CRUD.Blog
{
    public class BlogRequest
    {
        public string Title { get; set; }
        public string InnerData { get; set; }
        [Core.Infrastructure.Attributes.Nullable]
        public string PreviewPhotoPath { get; set; }
    }
}
