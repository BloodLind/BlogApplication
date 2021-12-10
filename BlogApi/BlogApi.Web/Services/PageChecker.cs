using BlogApi.Core.Infrastructure.Interfaces;
using BlogApi.Identity.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogApi.Web.Services
{
    public static class PageChecker
    {
        public static int CountOnPage { get; set; } = 10;
        public static bool PageCheck<T>(int page, IRepository<T> repository) where T : class, IGuidKey, new()
        {
            if (page <= 0)
                return false;
            if (page > Math.Ceiling(repository.GetAll().Count() / (double)CountOnPage))
                return false;

            return true;
        }

        public static bool PageCheck(int page, UserRepository repository)
        {
            if (page <= 0)
                return false;
            if (page > Math.Ceiling(repository.Users.Count() / (double)CountOnPage))
                return false;

            return true;
        }
    }
}
