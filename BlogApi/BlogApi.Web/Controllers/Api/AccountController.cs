using BlogApi.Core.Services;
using BlogApi.Identity.Models;
using BlogApi.Identity.Repositories;
using BlogApi.Web.Models.ViewModels.Api;
using BlogApi.Web.Models.ViewModels.Api.Account;
using BlogApi.Web.Services.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.Cookies;
using BlogApi.Web.Services;

namespace BlogApi.Web.Controllers.Api
{
    [Route("/api/account/"), ApiController, Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class AccountController : Controller
    {
        private readonly UserRepository userRepository;
        private readonly IJwtGenerator jwtGenerator;
        private readonly SubscriptionRepository subscriptionRepository;

        public AccountController(UserRepository userRepository, IJwtGenerator jwtGenerator, SubscriptionRepository subscriptionRepository)
        {
            this.userRepository = userRepository;
            this.jwtGenerator = jwtGenerator;
            this.subscriptionRepository = subscriptionRepository;
        }

        private async Task<ClaimsIdentity> GetIdentity(string login, string password)
        {
            var user = await userRepository.GetUserAsync(login);
            user ??= await userRepository.GetUserByLoginAsync(login);
            if (user == null)
                return null;

            var result = await userRepository.SignInManager.CheckPasswordSignInAsync(user, password, false);
            if (result.Succeeded)
            {
                return (await userRepository.SignInManager.ClaimsFactory.CreateAsync(user)).Identities.First();
            }
            return null;
        }

        [AllowAnonymous, HttpGet("login/external/{provider?}")]
        public IActionResult ExternalLogin(string redirectUrl, string provider = "Google")
        {
            var properties = userRepository.SignInManager.ConfigureExternalAuthenticationProperties(provider: provider,
                redirectUrl: Url.Action("ExternalResponse", "Account", new { redirectUrl = redirectUrl }));

            return new ChallengeResult(provider, properties);
        }

        [AllowAnonymous, HttpGet("login/external/response/")]
        public async Task<ActionResult> ExternalResponse(string redirectUrl)
        {
            var externalProviders = (await userRepository.SignInManager.
                GetExternalAuthenticationSchemesAsync()).ToList();
            var info = await userRepository.SignInManager.GetExternalLoginInfoAsync();

            if (info == null)
                return BadRequest("Error occured when external provider's data was loading");

            var result = await userRepository.SignInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, false);
            ClaimsIdentity claims = null;
            User user = null;

            if (!result.Succeeded)
            {
                var email = info.Principal.FindFirstValue(ClaimTypes.Email);
                if (email != null)
                {
                    user = await userRepository.GetUserAsync(email);
                    if (user == null)
                    {
                        user = new User
                        {
                            Email = email,
                            UserName = email
                        };
                        await userRepository.AddUserAsync(user);
                        await userRepository.AddToRoleAsync(user, "User");
                    }
                    await userRepository.AddLoginAsync(user, info);
                    await userRepository.SignInManager.SignInAsync(user, isPersistent: false);
                }
            }
            else
                user = await userRepository.GetUserAsync(info.Principal.FindFirstValue(ClaimTypes.Email));


            claims = (await userRepository.SignInManager.ClaimsFactory.CreateAsync(user)).Identities.First();
            return Redirect($"https://{redirectUrl}?token={jwtGenerator.CreateToken(claims)}");
        }

        [HttpPost, AllowAnonymous]
        public async Task<ActionResult> Login([FromBody] ClientRequest request)
        {
            if (request == null || request.Login == null || request == null)
            {
                return BadRequest();
            }
            else
            {
                var identity = await GetIdentity(request.Login, request.Password);
                if (identity == null)
                {
                    return BadRequest();
                }
                else
                {
                    var user = await userRepository.GetUserAsync(request.Login);
                    user ??= await userRepository.GetUserByLoginAsync(request.Login);
                    return Json(ResponseCreator.AccountResponse(user, jwtGenerator.CreateToken(identity)));
                }
            }
        }

        [Authorize, HttpGet("logout")]
        public async Task<ActionResult> Logout()
        {
            await userRepository.SignInManager.SignOutAsync();
            return StatusCode(StatusCodes.Status200OK);
        }
        [HttpPost("register"), AllowAnonymous]
        public async Task<ActionResult> RegisterUser([FromBody]RegisterUserRequest request)
        {
            if (CheckObjectForNull.CheckForNull(request))
                return BadRequest();

            
            var result = await userRepository.AddUserAsync(
                new()
                {
                    Email = request.Email,
                    UserName = request.Login,
                }, request.Password);

            if (result.Succeeded)
            {
                var user = await userRepository.GetUserByLoginAsync(request.Login);
                await userRepository.AddToRoleAsync(user, "User");
                var identity = await GetIdentity(request.Login, request.Password);

                return Json(ResponseCreator.AccountResponse(user, jwtGenerator.CreateToken(identity)));

            }
            else
                return BadRequest(result.Errors);
            
        }

        [HttpPost("subscribe")]
        public async Task<ActionResult> SubscribeUser([FromBody] string authorId)
        {
            try
            {
                var id = Guid.Parse(authorId);
               
                var currentUserId = User.Identities.ElementAt(0).Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
                if (currentUserId == authorId)
                    throw new Exception("Cannot subscribe user to himself");

                subscriptionRepository.CreateOrUpdate(new()
                {
                    Id = Guid.NewGuid(),
                    AuthorId = authorId,
                    SubscriberId = currentUserId
                }) ;
                subscriptionRepository.SaveChanges();

                return Json(ResponseCreator.SubscriptionResponse(authorId, currentUserId));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("unsubscribe")]
        public async Task<ActionResult> UnsubscribeUser([FromBody] string authorId)
        {
            try
            {
                var id = Guid.Parse(authorId);
                var currentUserId = User.Identities.ElementAt(0).Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
                var subscription = subscriptionRepository.GetAll().Where(x => (x.AuthorId == authorId && x.SubscriberId == currentUserId)).FirstOrDefault();
                subscriptionRepository.Delete(subscription);

                return Json(ResponseCreator.SubscriptionResponse(authorId, currentUserId));
            }
            catch
            {
                return BadRequest();
            }
        }

    }
}
