using BlogApi.BlogDatabase.Models;
using BlogApi.Core.Infrastructure.Interfaces;
using BlogApi.Core.Services;
using BlogApi.Identity.Models;
using BlogApi.Identity.Repositories;
using BlogApi.Web.Models.ViewModels.Api.Account;
using BlogApi.Web.Models.ViewModels.Api.Blog;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
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
            if (page > Math.Ceiling(repository.GetAll().Count() / (double)countOnPage))
                return false;

            return true;
        }

        private bool PageCheck(int page, UserRepository repository)
        {
            if (page <= 0)
                return false;
            if (page > Math.Ceiling(repository.Users.Count() / (double)countOnPage))
                return false;

            return true;
        }

        private async Task<UserDataResponse> GetUserDataFiltred(Func<User, ICollection<string>, bool> predicate, UserDataRequest request)
        {
            var users = (await userRepository.Users.ToListAsync()).Where(x => predicate(x, request.UsersId));

            var usersData = users.Skip((request.Page - 1) * request.Count).Take(request.Count).Select(x =>
            {
                string userPhotoId = userPhotoRepository.GetAll().Include(x => x.Photo).FirstOrDefault(photo => photo.UserId == x.Id)?.Photo.Id.ToString();
                return new UserData
                {
                    Id = x.Id,
                    Name = x.UserName,
                    Photo = !String.IsNullOrEmpty(userPhotoId) ? $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}/api/blog/photos/id-{userPhotoId}" : null
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

        private ArticleResponse ArticleResponse(int page, string searchText)
        {
            List<Article> articles;
            int total = articlesRepository.GetAll().Count();
            if (articlesRepository == null)
                return null;

            if (searchText == null)
                articles = articlesRepository.GetAll().OrderByDescending(x => x.PublicationDate).Skip((page - 1) * countOnPage).Take(countOnPage).ToList();
            else
                articles = articlesRepository.GetAll().Where(x => x.Title.Contains(searchText))
                    .Skip((page - 1) * countOnPage).Take(countOnPage).ToList();

            return new ArticleResponse
            {
                Count = articles.Count,
                CurrentPage = page,
                PageCount = (int)Math.Ceiling(total / (double)countOnPage),
                Total = total,
                Result = articles
            };

        }
        public BlogController(IRepository<Article> articlesRepository, IRepository<Photo> photoRepository, IRepository<UserPhoto> userPhotoRepository, UserRepository userRepository)
        {
            this.articlesRepository = articlesRepository;
            this.photoRepository = photoRepository;
            this.userPhotoRepository = userPhotoRepository;
            this.userRepository = userRepository;
        }

        [HttpGet("articles/page-{page:int}"), HttpGet(""), HttpGet("/articles")]
        public async Task<ActionResult> Articles(int page = 1, string searchText = null)
        {

            if (!PageCheck(page, articlesRepository))
                return BadRequest();

            return Json(ArticleResponse(page, searchText));
        }
        [HttpGet("photos/id-{id}")]
        public async Task<ActionResult> PhotoById(string id)
        {


            var file = Path.Combine(Directory.GetCurrentDirectory(),
                                                "Files", "Images", photoRepository.Get(Guid.Parse(id)).Path);
            var provider = new FileExtensionContentTypeProvider();
            string contentType;
            if (provider.TryGetContentType(Path.GetFileName(file), out contentType))
            {
                return PhysicalFile(file, contentType);
            }
            return BadRequest();

        }

        [HttpGet("articles/id-{id}"), HttpPost("articles/id-{id}")]
        public async Task<ActionResult> ArticleById(string id)
        {
            return Json(articlesRepository.Get(Guid.Parse(id)));
        }





        [HttpPost("articles/subscriptions")]
        public async Task<ActionResult> SubscribtionArticles([FromBody] SubscriptionArticlesRequest request)
        {
            if (request.UserLogin == null || !PageCheck(request.Page, articlesRepository))
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
                PageCount = (int)Math.Ceiling(result.Count / (double)countOnPage),
                Total = articles.Count(),
                Result = result
            });
        }


        [HttpPost("articles/user-articles")]
        public async Task<ActionResult> UserArcticles([FromBody] SubscriptionArticlesRequest request)
        {
            if (request.UserLogin == null || !PageCheck(request.Page, articlesRepository))
            {
                return BadRequest();
            }

            var user = await userRepository.GetUserByLoginAsync(request.UserLogin);
            var articles = (await articlesRepository.GetAll().AsNoTracking().ToListAsync())
                .Where(x => user.Id == x.AuthorId.ToString())
                .OrderBy(x => x.PublicationDate);
            var result = articles.Skip((request.Page - 1) * countOnPage).Take(countOnPage).ToList();

            return Json(new ArticleResponse
            {
                Count = result.Count,
                CurrentPage = request.Page,
                PageCount = (int)Math.Ceiling(result.Count / (double)countOnPage),
                Total = articles.Count(),
                Result = result
            });
        }


        [HttpPost("users")]
        public async Task<ActionResult> GetUserInformation([FromBody] UserDataRequest request)
        {
            if (CheckObjectForNull.CheckForNull(request) && PageCheck(request.Page, userRepository))
                return BadRequest();

            return Json(await GetUserDataFiltred((x, collection) => collection.Contains(x.Id), request));

        }
        [HttpPost("search/users")]
        public async Task<ActionResult> GetUsers([FromBody] UserDataRequest request)
        {
            if (CheckObjectForNull.CheckForNull(request) && PageCheck(request.Page, userRepository))
                return BadRequest();
            return Json(await GetUserDataFiltred((x, collection) => collection.Any(item => item.Contains(x.UserName)), request));
        }
    }
}
