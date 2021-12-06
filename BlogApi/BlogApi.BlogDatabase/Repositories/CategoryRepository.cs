using BlogApi.BlogDatabase.Models;
using BlogApi.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogApi.BlogDatabase.Repositories
{
    public class CategoryRepository : AbstractRepository<Category>
    {
        public CategoryRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}
