using BlogApi.BlogDatabase.Models;
using BlogApi.Core.Infrastructure.Interfaces;
using BlogApi.Identity.Models;
using BlogApi.Web.Models.ViewModels.Api;
using BlogApi.Web.Models.ViewModels.Api.Account;
using BlogApi.Web.Models.ViewModels.Api.Blog;
using BlogApi.Web.Models.ViewModels.Api.Comments;
using BlogApi.Web.Models.ViewModels.Api.Likes;
using BlogApi.Web.Models.ViewModels.Api.LIkes;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogApi.Web.Services
{
    public static class ResponseCreator
    {
        public static ArticleResponse ArticleResponse(int page, IRepository<Article> articlesRepository, string searchText = null)
        {
            List<Article> articles;
            int total = articlesRepository.GetAll().Count();

            if (articlesRepository == null)
                return null;

            if (searchText == null)
                articles = articlesRepository.GetAll().OrderByDescending(x => x.PublicationDate).Skip((page - 1) * PageChecker.CountOnPage).Take(PageChecker.CountOnPage).ToList();
            else
                articles = articlesRepository.GetAll().Where(x => x.Title.Contains(searchText))
                    .Skip((page - 1) * PageChecker.CountOnPage).Take(PageChecker.CountOnPage).ToList();

            return ArticleResponse(page, articles, total);

        }

        public static ArticleResponse ArticleResponse(int page, IEnumerable<Article> articles, int total) => new()
            {
                Count = articles.Count(),
                CurrentPage = page,
                PageCount = (int)Math.Ceiling(total / (double)PageChecker.CountOnPage),
                Total = total,
                Result = articles
            };
        

        public static async Task<ArticleResponse> UserArticlesAsync(IRepository<Article> articlesRepository, Predicate<Article> predicate, int page)
        {
            var articles = (await articlesRepository.GetAll().AsNoTracking().ToListAsync())
                .Where(x => predicate(x))
                .OrderBy(x => x.PublicationDate);
            var result = articles.Skip((page - 1) * PageChecker.CountOnPage).Take(PageChecker.CountOnPage).ToList();

            return ArticleResponse(page, result, articles.Count());
        }


        public static LikesResponse LikesResponse(string articleId, string userId, bool isLiked) => new LikesResponse
            {
                ArticleId = articleId,
                UserId = userId,
                IsLiked = isLiked
            };

        public static AccountResponse AccountResponse(User user, string token = null) => new ()
        {
            Id = user.Id,
            Email = user.Email,
            Login = user.UserName,
            Role = user.UserRoles.FirstOrDefault(x => x.UserId == user.Id)?.Role?.Name,
            Token = token
        };

        public static SubscriptionResponse SubscriptionResponse(string authorId, string userId) => new ()
        {
            AuthorId = authorId,
            SubscriberId = userId
        };

        public static CommentResponse CommentResponse(string comment, string userId, string commentId) => new()
        {
            Comment = comment,
            UserId = userId,
            CommentId = commentId
        };

        public static ArticleLikesResponse ArticleLikesResponse(string articleId, int likes, int dislikes) => new()
        {
            ArticleId = articleId,
            LikesCount = likes,
            DislikesCount = dislikes
        };


        public static UserDataResponse UserDataResponse(IEnumerable<User>users,
            IRepository<UserPhoto> userPhotoRepository,
            HttpContext httpContext, int total, int page = 1)
        {
            var usersData = users.Select(x =>
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

            return new()
            {
                Total = total,
                Page = page,
                Count = usersData.Count,
                UserDatas = usersData
            };
        }
    }
}
