using BlogApi.BlogDatabase.Models;
using BlogApi.Core.Infrastructure.Interfaces;
using BlogApi.Core.Services;
using BlogApi.Web.Infrastructure;
using BlogApi.Web.Models.ViewModels.Api.Comments;
using BlogApi.Web.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogApi.Web.Controllers.Api
{
    [ApiController, Route("api/article/")]
    public class ArticleController : Controller
    {
        private readonly int commentsOnPage = 50;
        private readonly IRepository<Like> likesRepository;
        private readonly IRepository<Comment> commentsRepository;
        private readonly IRepository<Article> articlesRepository;

        public ArticleController(IRepository<Like> likesRepository, IRepository<Comment> commentsRepository, IRepository<Article> articlesRepository)
        {
            this.likesRepository = likesRepository;
            this.commentsRepository = commentsRepository;
            this.articlesRepository = articlesRepository;
        }

        [HttpGet("likes/id-{articleId}")]
        public IActionResult GetLikes(string articleId)
        {
            if (String.IsNullOrEmpty(articleId))
                return BadRequest();

            var likes = DataFilter.GetLikes(likesRepository, x => x.ArticleId.ToString().Equals(articleId));
            return Json(ResponseCreator.ArticleLikesResponse(articleId, likes.Where(x => x.IsLiked).Count(), likes.Where(x => !x.IsLiked).Count()));
        }

        [HttpPost("comments/id-{articleId}")]
        public async Task<ActionResult> GetComments([FromBody] ArticleCommentsRequest request)
        {
            if (CheckObjectForNull.CheckForNull(request) && !PageChecker.PageCheck(request.Page, commentsRepository))
                return BadRequest();

            var comments = commentsRepository.GetAll().Where(x => x.ArticleId.ToString() == request.ArticleId).AsNoTracking();
            var result = comments.Skip((request.Page - 1) * commentsOnPage).Take(commentsOnPage).ToList();
            int total = comments.Count();

            return Json(new ResultResponse<IEnumerable<Comment>>
            {
                Result = comments,
                Count = result.Count,
                CurrentPage = request.Page,
                PageCount = (int)Math.Ceiling(total / (double)PageChecker.CountOnPage),
                Total = total
            });
        }
    }
}
