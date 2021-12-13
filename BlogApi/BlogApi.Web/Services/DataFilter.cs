using BlogApi.BlogDatabase.Models;
using BlogApi.BlogDatabase.Repositories;
using BlogApi.Core.Infrastructure.Interfaces;
using BlogApi.Identity.Models;
using BlogApi.Identity.Repositories;
using BlogApi.Web.Models.ViewModels.Api.Blog;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogApi.Web.Services
{
    public static class DataFilter
    {

        public static async Task<UserDataResponse> GetUsersData(
            Predicate<User> predicate,
            UserRepository userRepository,
            IRepository<UserPhoto> userPhotoRepository, 
            HttpContext httpContext, UserDataRequest request)
        {
            var users = (await userRepository.Users.AsNoTracking().ToListAsync()).Where(x => predicate(x));
            return ResponseCreator.UserDataResponse(users.Skip((request.Page - 1) * request.Count).Take(request.Count),
                userPhotoRepository, httpContext, users.Count(), request.Page);
        }

        public static async Task<UserDataResponse> GetUsersData(
            Predicate<User> predicate,
            UserRepository userRepository,
            IRepository<UserPhoto> userPhotoRepository,
            HttpContext httpContext)
        {
            var users = (await userRepository.Users.AsNoTracking().ToListAsync()).Where(x => predicate(x));
            return ResponseCreator.UserDataResponse(users,
                userPhotoRepository, httpContext, users.Count());
        }
        public static IQueryable<Like> GetLikes(IRepository<Like> likesRepository, Predicate<Like> predicate)
        {
            return likesRepository.GetAll().Where(x => predicate(x));
        }

    }
}
