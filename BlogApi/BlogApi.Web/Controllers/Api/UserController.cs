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
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogApi.Web.Controllers.Api
{
    [Route("/api/user-info/"), ApiController, Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

    public class UserController : Controller
    {
        private readonly int countOnPage = 9;
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

        [HttpGet("self")]
        public async Task<ActionResult> GetSelfInfo()
        {
            var user = await userRepository.GetUserAsync(this.User);
            return Json(new AccountResponse
            {
                Login = user.UserName,
                Email = user.Email
            });
        }

        [HttpGet("publications/page-{page}")]
        public async Task<ActionResult> GetPublications(int page)
        {
            if (!PageCheck(page, articlesRepository))
            {
                return BadRequest();
            }


            var user = await userRepository.GetUserAsync(this.User);
            var articles = (await articlesRepository.GetAll().AsNoTracking().ToListAsync())
                .Where(x => user.Id == x.AuthorId.ToString())
                .OrderBy(x => x.PublicationDate);
            var result = articles.Skip((page - 1) * countOnPage).Take(countOnPage).ToList();

            return Json(new ArticleResponse
            {
                Count = result.Count,
                CurrentPage = page,
                PageCount = (int)Math.Ceiling(result.Count / (double)countOnPage),
                Total = articles.Count(),
                Result = result
            });
        }


        [HttpGet("subs-blogs/page-{page}")]
        public async Task<ActionResult> SubscribtionArticles(int page)
        {
            if (!PageCheck(page, articlesRepository))
            {
                return BadRequest();
            }

            var user = await userRepository.GetUserAsync(this.User);

            var subscriptions = (await userRepository.GetUserSubsciptions(user.UserName));
            var articles = (await articlesRepository.GetAll().AsNoTracking().ToListAsync())
                .Where(x => subscriptions.Any(s => s.AuthorId == x.AuthorId.ToString()))
                .OrderBy(x => x.PublicationDate);
            var result = articles.Skip((page - 1) * countOnPage).Take(countOnPage).ToList();

            return Json(new SubscribesResponse
            {
                Count = result.Count,
                CurrentPage = page,
                PageCount = (int)Math.Ceiling(result.Count / (double)countOnPage),
                Total = articles.Count(),
                Result = result
            });
        }


        private async Task<UserDataResponse> GetUserDataFiltred(Func<User, ICollection<string>, bool> predicate, UserDataRequest request)
        {
            var users = (await userRepository.Users.ToListAsync()).Where(x => predicate(x, request.UsersId));

            var usersData = users.Skip((request.Page - 1) * request.Count).Take(request.Count).Select(x =>
            {
                var userPhoto = userPhotoRepository.GetAll().FirstOrDefault(photo => photo.UserId == x.Id);
                return new UserData
                {
                    Id = x.Id,
                    Name = x.UserName,
                    Photo = !String.IsNullOrEmpty(userPhoto?.PhotoPath) ?
                                         $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}/api/blog/photos/id-{userPhoto?.PhotoPath}" : null,
                    ProfilePhoto = !String.IsNullOrEmpty(userPhoto?.HeaderPhotoPath) ?
                                         $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}/api/blog/photos/id-{userPhoto?.HeaderPhotoPath}" : null

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

        [HttpGet("subs-users/page-{page}")]
        public async Task<ActionResult> GetSubscriptionUsers(int page)
        {
            if (!PageCheck(page, userRepository))
                return BadRequest();

            var user = await userRepository.GetUserAsync(this.User);
            var subscriptions = (await userRepository.GetUserSubsciptions(user.UserName));
            List<string> ids = new List<string>();

            foreach (var x in subscriptions)
            {
                ids.Add(x.AuthorId);
            }

            UserDataRequest request = new UserDataRequest()
            {
                UsersId = ids,
                Page = page
            };

            return Json(await GetUserDataFiltred((x, collection) => collection.Contains(x.Id), request));
        }

        [HttpPost("like-dislike")]
        public async Task<ActionResult> LikeOrDislike([FromBody] LikeRequest request)
        {
            if (articlesRepository.Get(Guid.Parse(request.ArticleId)) is null)
            {
                return BadRequest();
            }
            var user = await userRepository.GetUserAsync(this.User);
            Like like = likesRepository.GetAll().Where(x => x.ArticleId.ToString() == request.ArticleId && x.UserId.ToString() == user.Id).FirstOrDefault();

            if (like is null)
            {
                like = new Like()
                {
                    UserId = Guid.Parse(user.Id),
                    ArticleId = Guid.Parse(request.ArticleId)
                };
                likesRepository.CreateOrUpdate(like);
                likesRepository.SaveChanges();
            }
            else
            {
                like.IsLiked = !like.IsLiked;
                likesRepository.SaveChanges();
            }

            return Json(new LikesResponse
            {
                ArticleId = request.ArticleId,
                UserId = user.Id,
                IsLiked = like.IsLiked
            });

        }

        [HttpPost("comment")]
        public async Task<ActionResult> LeaveComment([FromBody] CommentRequest request)
        {
            if (articlesRepository.Get(Guid.Parse(request.ArticleId)) is null)
            {
                return BadRequest();
            }

            var user = await userRepository.GetUserAsync(this.User);

            Comment comment = new Comment()
            {
                Id = Guid.NewGuid(),
                ArticleId = Guid.Parse(request.ArticleId),
                InnerData = request.Comment,
                UserId = Guid.Parse(user.Id)
            };

            commentsRepository.CreateOrUpdate(comment);
            commentsRepository.SaveChanges();


            return Json(new CommentResponse
            {
                Comment = request.Comment,
                UserId = user.Id,
                CommentId = comment.Id.ToString()
            });
        }

        [HttpDelete("comment-del")]
        public async Task<ActionResult> DeleteComment([FromBody] string commentId)
        {
            var user = await userRepository.GetUserAsync(this.User);
            var comment = commentsRepository.Get(Guid.Parse(commentId));

            if ((comment.UserId != Guid.Parse(user.Id) && comment.Artice.AuthorId != Guid.Parse(user.Id)) || comment == null)
                return BadRequest();
            

            commentsRepository.Delete(comment);
            commentsRepository.SaveChanges();
            return Json(new CommentResponse
            {
                CommentId = commentId
            });

        }

    }
}
