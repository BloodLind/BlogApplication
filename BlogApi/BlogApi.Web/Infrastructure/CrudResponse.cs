using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogApi.Web.Infrastructure
{
    public abstract class CrudResponse<T>
    {
        public T Result { get; set; }
        public string ApiRequest { get; set; }
    }
}
