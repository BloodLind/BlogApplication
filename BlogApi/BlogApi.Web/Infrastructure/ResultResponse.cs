using BlogApi.Web.Infrastructure.Interfaces;
using System.Collections.Generic;

namespace BlogApi.Web.Infrastructure
{
    public abstract class ResultResponse<T> : IResultResponse<T>
    {
        public int Count { get; set; }
        public int Total { get; set; }
        public int CurrentPage { get; set; }
        public int PageCount { get; set; }
        public T Result { get; set ; }
    }
}
