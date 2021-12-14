using BlogApi.BlogDatabase.Models;
using BlogApi.Core.Infrastructure.Interfaces;
using BlogApi.Core.Services;
using BlogApi.Web.Models.ViewModels.Api.CRUD;
using BlogApi.Web.Models.ViewModels.Api.CRUD.Blog;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BlogApi.Web.Controllers.Api
{


    public class FileCON
    { 
        public string File { get; set; }
    }

    [ApiController, Route("api/blog/crud"), Authorize(AuthenticationSchemes =
    JwtBearerDefaults.AuthenticationScheme)]
    public class CRUDBlogController : Controller
    {
        private readonly IRepository<Article> articleRepository;

        public IRepository<Category> CategoryRepository { get; }

        public CRUDBlogController(IRepository<Article> articleRepository, IRepository<Category> categoryRepository)
        {
            this.articleRepository = articleRepository;
            CategoryRepository = categoryRepository;
        }

        [HttpPost("add-photo"), AllowAnonymous]
        public async Task<ActionResult> AddPhoto(IFormFile image)
        {


            string fileName = $"{Guid.NewGuid()}{Path.GetExtension(image.FileName)}";
            string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Files", "Images", fileName);
            using (FileStream fs = new FileStream(filePath, FileMode.Create))
                await image.CopyToAsync(fs);
            return Json(new
            {
                success = 1,
                file = new { url = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}/api/blog/photos/{fileName}" },
                photoName = fileName

            });
           
        }
        [HttpPost("add-photo-url"),AllowAnonymous]
        public async Task<ActionResult> AddPhotoByURL(AddPhotoByUrlRequest request)
        {
           
            if (request.Url.Contains("."))
            {
                string oldFileName = request.Url.Substring(request.Url.LastIndexOf("/")+1);
                string fileName =$"{Guid.NewGuid()}.{Path.GetExtension(oldFileName)}";
                string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Files", "Images", fileName);
                using (WebClient client = new WebClient())
                    client.DownloadFile(request.Url, filePath);
                return Json(new
                {
                    success = 1,
                    file = new { url = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}/api/blog/photos/{fileName}" },
                     photoName = fileName
                });
            }
            return Json(new{success = 0 });
        }

        [HttpPost("add-article")]
        public async Task<ActionResult> AddBlog(BlogRequest request)
        {
            if (CheckObjectForNull.CheckForNull(request) || request.Title == "")
            {
                return BadRequest();
            }


            List<Category> exsists = CategoryRepository.GetAll().Where(x => request.Categories.Contains(x.Name)).ToList();
            List<Category> categories = request.Categories.Where(x=>exsists.FirstOrDefault(y=>y.Name == x)==null).Select(x => new Category() { Name = x }).ToList();
            categories.AddRange(exsists);

            Article article = new()
            {
                Id = Guid.NewGuid(),
                AuthorId = Guid.Parse(User.Identities.ElementAt(0).Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value),
                InnerData = request.InnerData,
                PreviewPhotoPath = request.PreviewPhotoPath,
                Title = request.Title,
                PublicationDate = DateTime.Now,
                Categories = categories
              };

            articleRepository.CreateOrUpdate(article);
            articleRepository.SaveChanges();
            

            return Json(new {ArticleId = article.Id });
        }
    }
}
