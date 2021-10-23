﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogApi.Core.Infrastructure.Interfaces
{
    public interface IRepository<T> where T : class, IGuidKey, new()
    {
        T Get(Guid id);
        IQueryable<T> GetAll();
        void CreateOrUpdate(T entity, Guid id = default(Guid));
        void Delete(T entity);
        void SaveChanges();
        void Delete(Guid id);
    }
}
