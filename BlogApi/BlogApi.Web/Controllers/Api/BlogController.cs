using BlogApi.BlogDatabase.Models;
using BlogApi.Core.Infrastructure.Interfaces;
using BlogApi.Core.Services;
using BlogApi.Identity.Models;
using BlogApi.Identity.Repositories;
using BlogApi.Web.Models.ViewModels.Api.Account;
using BlogApi.Web.Models.ViewModels.Api.Blog;
using BlogApi.Web.Services;
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
        private readonly IRepository<Article> articlesRepository;
        private readonly IRepository<UserPhoto> userPhotoRepository;
        private readonly UserRepository userRepository;
       
        public BlogController(IRepository<Article> articlesRepository, IRepository<UserPhoto> userPhotoRepository, UserRepository userRepository)
        {
            this.articlesRepository = articlesRepository;
            this.userPhotoRepository = userPhotoRepository;
            this.userRepository = userRepository;
        }

        [HttpGet("articles/page-{page:int}"), HttpGet(""), HttpGet("/articles")]
        public async Task<ActionResult> Articles(int page = 1, string searchText = null)
        {
            if (!PageChecker.PageCheck(page, articlesRepository))
                return BadRequest();

            return Json(ResponseCreator.ArticleResponse(page, articlesRepository, searchText));
        }

        [HttpGet("photos/{name}")]
        public async Task<ActionResult> GetPhoto(string name)
        {
            if (String.IsNullOrEmpty(name))
                return BadRequest("No image with name:" + name);
 
            var file = Directory.GetFiles(Path.Combine(Directory.GetCurrentDirectory(),
                                                "Files", "Images"), $"{name}.*").FirstOrDefault();
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
            var article = articlesRepository.Get(Guid.Parse(id));
            article.ViewsCount++;
            articlesRepository.SaveChanges();
            return Json(article);
        }


        [HttpPost("articles/subscriptions")]
        public async Task<ActionResult> SubscribtionArticles([FromBody] SubscriptionArticlesRequest request)
        {
            if (request.UserLogin == null || !PageChecker.PageCheck(request.Page, articlesRepository))
            {
                return BadRequest();
            }

            var subscriptions = (await userRepository.GetUserSubsciptions(request.UserLogin));
            return Json(await ResponseCreator.UserArticlesAsync(articlesRepository, (x => subscriptions.Any(s => s.AuthorId == x.AuthorId.ToString())), request.Page));
        }

        [HttpPost("user/articles")]
        public async Task<ActionResult> UserArcticles([FromBody] SubscriptionArticlesRequest request)
        {
            if (request.UserLogin == null || !PageChecker.PageCheck(request.Page, articlesRepository))
                return BadRequest();


            var user = await userRepository.GetUserByLoginAsync(request.UserLogin);
            return Json(await ResponseCreator.UserArticlesAsync(articlesRepository,(x => x.AuthorId.ToString() == user.Id), request.Page));
        }

        [HttpPost("users")]
        public async Task<ActionResult> GetUsersInformation([FromBody] UserDataRequest request)
        {
            if (CheckObjectForNull.CheckForNull(request) && PageChecker.PageCheck(request.Page, userRepository))
                return BadRequest();

            return Json(await DataFilter.GetUsersData((x) => request.UsersId.Contains(x.Id),
                userRepository, userPhotoRepository, HttpContext, request));

        }

        [HttpGet("user/id-{id}")]
        public async Task<ActionResult> GetUserInfo(string id)
        {
            if (id == null)
                return BadRequest();

            var user = await userRepository.GetUserByIdAsync(id);
            var userPhoto = userPhotoRepository.GetAll().FirstOrDefault(x => x.UserId == user.Id);
            return Json(new UserData()
            {
                Id = user.Id,
                Name = user.UserName,
                Photo = !String.IsNullOrEmpty(userPhoto?.PhotoPath) ?
                                         $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}/api/blog/photos/{userPhoto?.PhotoPath}" :  null,
                ProfilePhoto = !String.IsNullOrEmpty(userPhoto?.PhotoPath) ?
                                         $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}/api/blog/photos/{userPhoto?.PhotoPath}" : null
            });
        }

        
        [HttpPost("search/users")]
        public async Task<ActionResult> GetUsers([FromBody] UserDataRequest request)
        {
            if (CheckObjectForNull.CheckForNull(request) && PageChecker.PageCheck(request.Page, userRepository))
                return BadRequest();

            return Json(await DataFilter.GetUsersData((x) => request.UsersId.Any(item => item.Contains(x.UserName)),
                userRepository, userPhotoRepository, HttpContext, request));
        }

    }
}



