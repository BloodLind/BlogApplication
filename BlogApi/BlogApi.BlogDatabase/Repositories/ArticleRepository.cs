using BlogApi.BlogDatabase.Models;
using BlogApi.Core.Infrastructure.Interfaces;
using BlogApi.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogApi.BlogDatabase.Repositories
{
    public class ArticleRepository : AbstractRepository<Article>
    {
        public ArticleRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}
