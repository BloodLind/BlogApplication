using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogApi.Core.Infrastructure.Interfaces
{
    public interface IGuidKey
    {
        Guid Id { get; set; }
    }

}
