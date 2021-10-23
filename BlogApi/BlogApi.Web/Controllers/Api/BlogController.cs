using BlogApi.BlogDatabase.Models;
using BlogApi.Core.Infrastructure.Interfaces;
using BlogApi.Core.Services;
using BlogApi.Identity.Repositories;
using BlogApi.Web.Models.ViewModels.Api.Account;
using BlogApi.Web.Models.ViewModels.Api.Blog;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogApi.Web.Controllers.Api
{
    [ApiController, Route("api/blog")]
    public class BlogController : Controller
    {
        private readonly int countOnPage = 30;
        private readonly IRepository<Article> articlesRepository;
        private readonly IRepository<Photo> photoRepository;
        private readonly IRepository<UserPhoto> userPhotoRepository;
        private readonly UserRepository userRepository;

        private bool PageCheck<T>(int page, IRepository<T> repository) where T : class, IGuidKey, new()
        {
            if (page <= 0)
                return false;
            if (page > (repository.GetAll().Count() / countOnPage) + 1)
                return false;

            return true;
        }


        private ArticleResponse ArticleResponse(int page, string searchText)
        {
            List<Article> articles;
            int total = articlesRepository.GetAll().Count();
            if (articlesRepository == null)
                return null;
            
            if(searchText == null)
                articles = articlesRepository.GetAll().Skip((page - 1) * countOnPage).Take(countOnPage).ToList();
            else
                articles = articlesRepository.GetAll().Where(x => x.Title.Contains(searchText))
                    .Skip((page - 1) * countOnPage).Take(countOnPage).ToList();

            return new ArticleResponse
            {
                Count = articles.Count,
                CurrentPage = page,
                PageCount = (total / countOnPage) + 1,
                Total = total,
                Result = articles
            };

        }
        public BlogController(IRepository<Article> articlesRepository, IRepository<Photo> photoRepository,IRepository<UserPhoto> userPhotoRepository, UserRepository userRepository)
        {
            this.articlesRepository = articlesRepository;
            this.photoRepository = photoRepository;
            this.userPhotoRepository = userPhotoRepository;
            this.userRepository = userRepository;
        }
        
        [HttpGet("articles/page-{page:int}"), HttpGet(""), HttpGet("api/blog/articles")]
        public async Task<ActionResult> Articles(int page = 1, string searchText = null)
        {
            
            if (!PageCheck(page, articlesRepository))
                return BadRequest();

            return Json(ArticleResponse(page, searchText));
        }

        [HttpGet("articles/id-{id}"), HttpPost("articles/id-{id}")]
        public async Task<ActionResult> ArticleById(string id)
        {
            return Json(articlesRepository.Get(Guid.Parse(id)));
        }


        [HttpGet("photos/page-{page:int}"), HttpGet("photos")]
        public async Task<ActionResult> Photos(int page = 1)
        {
            int total = photoRepository.GetAll().Count();
            if (!PageCheck(page, photoRepository))
                return BadRequest();

            var photos = photoRepository.GetAll().Skip((page - 1) * countOnPage).Take(countOnPage).ToList();
            return Json(new PhotoResponse
            {
               Count = photos.Count,
               CurrentPage = page,
               Total = total,
               PageCount = (total / countOnPage) + 1,
               Result = photos
            });
        }

        [HttpGet("photos/id-{id}"), HttpPost("photos/id-{id}")]
        public async Task<ActionResult> PhotoById(string id)
        {
            return Json(photoRepository.Get(Guid.Parse(id)));
        }

        [HttpPost("articles/subscriptions")]
        public async Task<ActionResult> SubscribtionArticles([FromBody] SubscriptionArticlesRequest request)
        {
            if(request.UserLogin == null || !PageCheck(request.Page, articlesRepository))
            {
                return BadRequest();
            }

            var subscriptions = (await userRepository.GetUserSubsciptions(request.UserLogin));
            var articles = (await articlesRepository.GetAll().AsNoTracking().ToListAsync())
                .Where(x => subscriptions.Any(s => s.AuthorId == x.AuthorId.ToString()))
                .OrderBy(x => x.PublicationDate);
            var result = articles.Skip((request.Page - 1) * countOnPage).Take(countOnPage).ToList();

            return Json(new SubscribesResponse
            {
                Count = result.Count,
                CurrentPage = request.Page,
                PageCount = (result.Count / countOnPage) + 1,
                Total = articles.Count(),
                Result = result
            });
        }
        [HttpPost("users")]
        public async Task<ActionResult> GetUserInformation([FromBody] UserDataRequest request)
        {
            if (CheckObjectForNull.CheckForNull(request))
                return BadRequest();
            var users = (await userRepository.Users.ToListAsync()).Where(x => request.UsersId.Contains(x.Id)).ToList();

            return Json(new UserDataResponse
            {
                Count = users.Count,
                UserDatas = users.Select(x => new UserData
                {
                    Name = x.UserName,
                    UserPhoto = userPhotoRepository.GetAll().FirstOrDefault(photo => photo.UserId == x.Id)
                }).ToList()
            }) ;
        }
    }
}
