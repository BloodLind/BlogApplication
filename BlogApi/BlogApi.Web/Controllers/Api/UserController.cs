using BlogApi.BlogDatabase.Models;
using BlogApi.BlogDatabase.Repositories;
using BlogApi.Core.Infrastructure.Interfaces;
using BlogApi.Core.Services;
using BlogApi.Identity.Models;
using BlogApi.Identity.Repositories;
using BlogApi.Web.Models.ViewModels.Api;
using BlogApi.Web.Models.ViewModels.Api.Account;
using BlogApi.Web.Models.ViewModels.Api.Blog;
using BlogApi.Web.Models.ViewModels.Api.Comments;
using BlogApi.Web.Models.ViewModels.Api.LIkes;
using BlogApi.Web.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BlogApi.Web.Controllers.Api
{
    [Route("/api/user/info/"), ApiController, Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

    public class UserController : Controller
    {
        private readonly UserRepository userRepository;
        private readonly SubscriptionRepository subscriptionRepository;
        private readonly IRepository<Comment> commentsRepository;
        private readonly IRepository<Like> likesRepository;
        private readonly IRepository<Article> articlesRepository;
        private readonly IRepository<UserPhoto> userPhotoRepository;

        public UserController(UserRepository userRepository, SubscriptionRepository subscriptionRepository, IRepository<Article> articlesRepository, IRepository<UserPhoto> userPhotoRepository,
            IRepository<Like> likesRepository, IRepository<Comment> commentsRepository)
        {
            this.userRepository = userRepository;
            this.subscriptionRepository = subscriptionRepository;
            this.articlesRepository = articlesRepository;
            this.userPhotoRepository = userPhotoRepository;
            this.commentsRepository = commentsRepository;
            this.likesRepository = likesRepository;
        }

        [AllowAnonymous, HttpGet("subscribers/id-{id}")]
        public async Task<ActionResult> GetSubsribersCount(string id) => Json(subscriptionRepository.GetAll().Where(x => x.AuthorId == id).Count());


        [HttpGet("self")]
        public async Task<ActionResult> GetSelfInfo() => Json(ResponseCreator.AccountResponse(await userRepository.GetUserByIdAsync(User.Identities.First()
                                                                             .Claims
                                                                                   .First(c => c.Type == ClaimTypes.NameIdentifier)
                                                                                      .Value.ToString())));


        [HttpGet("publications/page-{page}")]
        public async Task<ActionResult> GetPublications(int page)
        {
            if (!PageChecker.PageCheck(page, articlesRepository))
                return BadRequest();

            var user = await userRepository.GetUserAsync(this.User);
            return Json(await ResponseCreator.UserArticlesAsync(articlesRepository, (x => x.AuthorId.ToString() == user.Id), page));
        }


        [HttpGet("subscription/articles/page-{page}")]
        public async Task<ActionResult> GetSubscribtionArticles(int page)
        {
            if (!PageChecker.PageCheck(page, articlesRepository))
                return BadRequest();
            
            var user = await userRepository.GetUserAsync(this.User);
            var subscriptions = (await userRepository.GetUserSubsciptions(user.UserName));

            return Json(await ResponseCreator.UserArticlesAsync(articlesRepository,
                x => subscriptions.Any(s => x.AuthorId.ToString().Contains(s.AuthorId)), page));
        }

        [HttpGet("subscription/creators")]
        public async Task<ActionResult> GetSubscriptionUsers()
        {
            var user = await userRepository.GetUserAsync(this.User);
            var subscriptions = (await userRepository.GetUserSubsciptions(user.UserName)).Select(x => x.AuthorId).ToList();  
    
            return Json(await DataFilter.GetUsersData((x) => subscriptions.Contains(x.Id), userRepository, userPhotoRepository, HttpContext));
        }

        [HttpPost("like-dislike")]
        public async Task<ActionResult> LikeOrDislike([FromBody] LikeRequest request)
        {
            if (articlesRepository.Get(Guid.Parse(request.ArticleId)) is null)
                return BadRequest();


            var user = await userRepository.GetUserAsync(this.User);
            Like like = DataFilter.GetLikes(likesRepository,
                x => x.ArticleId.ToString().Equals(request.ArticleId) && x.UserId.ToString().Equals(user.Id)).FirstOrDefault();

            if (like is null)
            {
                like = new Like()
                {
                    UserId = Guid.Parse(user.Id),
                    ArticleId = Guid.Parse(request.ArticleId),
                    IsLiked = request.State
                };
                likesRepository.CreateOrUpdate(like);
            }
            else
                like.IsLiked = request.State;

            likesRepository.SaveChanges();

            return Json(ResponseCreator.LikesResponse(like.ArticleId.ToString(), user.Id, like.IsLiked));

        }

        [HttpDelete("like-dislike")]
        public async Task<ActionResult> RemoveLike([FromBody] LikeRequest request)
        {
            if (articlesRepository.Get(Guid.Parse(request.ArticleId)) is null)
                return BadRequest();

            var user = await userRepository.GetUserAsync(this.User);
            Like like = DataFilter.GetLikes(likesRepository,
                x => x.ArticleId.ToString().Equals(request.ArticleId) && x.UserId.ToString().Equals(user.Id)).FirstOrDefault();

            if (like is not null)
                likesRepository.Delete(like);

            return StatusCode(StatusCodes.Status200OK);
        }

        [HttpPost("comment")]
        public async Task<ActionResult> LeaveComment([FromBody] CommentRequest request)
        {
            if (articlesRepository.Get(Guid.Parse(request.ArticleId)) is null)
            {
                return BadRequest();
            }

            var user = await userRepository.GetUserAsync(this.User);

            Comment comment = new()
            {
                Id = Guid.NewGuid(),
                ArticleId = Guid.Parse(request.ArticleId),
                InnerData = request.Comment,
                UserId = Guid.Parse(user.Id)
            };

            commentsRepository.CreateOrUpdate(comment);
            commentsRepository.SaveChanges();


            return Json(ResponseCreator.CommentResponse(comment.InnerData, user.Id, comment.Id.ToString()));
        }

        [HttpDelete("comment")]
        public async Task<ActionResult> DeleteComment([FromBody] string commentId)
        {
            var user = await userRepository.GetUserAsync(this.User);
            var comment = commentsRepository.Get(Guid.Parse(commentId));

            if ((comment.UserId != Guid.Parse(user.Id) && comment.Article.AuthorId != Guid.Parse(user.Id)) || comment == null)
                return BadRequest();


            commentsRepository.Delete(comment);
            commentsRepository.SaveChanges();
            return Json(ResponseCreator.CommentResponse(comment?.InnerData, user.Id, commentId));

        }

    }
}
