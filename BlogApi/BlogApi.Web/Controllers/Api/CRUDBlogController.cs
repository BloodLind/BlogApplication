using BlogApi.BlogDatabase.Models;
using BlogApi.Core.Infrastructure.Interfaces;
using BlogApi.Core.Services;
using BlogApi.Web.Models.ViewModels.Api.CRUD.Blog;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BlogApi.Web.Controllers.Api
{
    [ApiController, Route("api/blog/crud"), Authorize(AuthenticationSchemes =
    JwtBearerDefaults.AuthenticationScheme)]
    public class CRUDBlogController : Controller
    {
        private readonly IRepository<Article> articleRepository;
        private readonly IRepository<Photo> photoRepository;

        public CRUDBlogController(IRepository<Article> articleRepository, IRepository<Photo> photoRepository)
        {
            this.articleRepository = articleRepository;
            this.photoRepository = photoRepository;
        }

        [HttpPost("photo")]
        public async Task<ActionResult> AddPhoto([FromBody] string photo)
        {
            if (photo == null)
                return BadRequest();

            if (!photoRepository.GetAll().Any(x => x.Data.Equals(photo)))
            { 
                photoRepository.CreateOrUpdate(new Photo { Data = photo });
                photoRepository.SaveChanges();
            }
            var result = photoRepository.GetAll().FirstOrDefault(x => x.Data == photo);
            return Json(new PhotoResponse 
            { 
                Result = result.Data,
                ApiRequest = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}/api/blog/photos/id-{result.Id}"
            });
        }

        [HttpPost("blog")]
        public async Task<ActionResult> AddBlog([FromBody] BlogRequest request)
        {
            if (CheckObjectForNull.CheckForNull(request) || request.Title == "")
            {
                return BadRequest();
            }

           Article article = new()
            {
                Id = Guid.NewGuid(),
                AuthorId = Guid.Parse(User.Identities.ElementAt(0).Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value),
                InnerData = request.InnerData,
                PreviewPhotoId = request.PreviewPhotoId == null ? null : Guid.Parse(request.PreviewPhotoId),
                Title = request.Title,
                PublicationDate = DateTime.Now
            };

            articleRepository.CreateOrUpdate(article);
            articleRepository.SaveChanges();


            return Json(new BlogResponse
            {
                Result = article,
                ApiRequest = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}/api/blog/articles/id-{article.Id}"
            });
        }
    }
}
