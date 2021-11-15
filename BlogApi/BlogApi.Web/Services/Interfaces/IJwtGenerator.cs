using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BlogApi.Web.Services.Interfaces
{
    public interface IJwtGenerator
    {
        string CreateToken(ClaimsIdentity identity);
    }
}
