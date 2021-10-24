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
    public class UserPhotoRepository : AbstractRepository<UserPhoto>
    {
        public UserPhotoRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}
