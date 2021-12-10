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

        public static async Task<UserDataResponse> GetUserDataFiltred(Func<User, ICollection<string>, bool> predicate,
            UserDataRequest request, UserRepository userRepository, IRepository<UserPhoto> userPhotoRepository, HttpContext httpContext)
        {
            var users = (await userRepository.Users.AsNoTracking().ToListAsync()).Where(x => predicate(x, request.UsersId));

            var usersData = users.Skip((request.Page - 1) * request.Count).Take(request.Count).Select(x =>
            {
                var userPhoto = userPhotoRepository.GetAll().AsNoTracking().FirstOrDefault(photo => photo.UserId == x.Id);
                return new UserData
                {
                    Id = x.Id,
                    Name = x.UserName,
                    Photo = !String.IsNullOrEmpty(userPhoto?.PhotoPath) ?
                                         $"{httpContext.Request.Scheme}://{httpContext.Request.Host}/api/blog/photos/{userPhoto?.PhotoPath}" : null,
                    ProfilePhoto = !String.IsNullOrEmpty(userPhoto?.HeaderPhotoPath) ?
                                         $"{httpContext.Request.Scheme}://{httpContext.Request.Host}/api/blog/photos/{userPhoto?.HeaderPhotoPath}" : null

                };
            }).ToList();

            return new UserDataResponse
            {
                Total = users.Count(),
                Page = request.Page,
                Count = usersData.Count,
                UserDatas = usersData
            };
        }
        public static IQueryable<Like> GetLikes(IRepository<Like> likesRepository, Predicate<Like> predicate)
        {
            return likesRepository.GetAll().Where(x => predicate(x));
        }

    }
}
