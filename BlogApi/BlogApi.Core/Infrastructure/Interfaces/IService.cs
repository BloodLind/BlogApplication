using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogApi.Core.Infrastructure.Interfaces
{
    public interface IService<T> where T : class
    {
        IQueryable<T> GetAll();
        void CreateOrUpdate(T entity);
        void Delete(T entity);
    }
}
