using System.Collections.Generic;

namespace BlogApi.Web.Infrastructure.Interfaces
{
    public interface IResultResponse<T>
    {
         int Count { get; set; }
         int Total { get; set; }
         int CurrentPage { get; set; }
         int PageCount { get; set; }
         T Result { get; set; }
    }
}
