using BlogApi.Core.Services;
using BlogApi.Identity.Repositories;
using BlogApi.Web.Models.ViewModels.Api;
using BlogApi.Web.Models.ViewModels.Api.Account;
using BlogApi.Web.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BlogApi.Web.Controllers.Api
{
    [Route("/api/account/"), ApiController]
    public class AccountController : Controller
    {
        private readonly UserRepository userRepository;
        private readonly IJwtGenerator jwtGenerator;

        public AccountController(UserRepository userRepository, IJwtGenerator jwtGenerator)
        {
            this.userRepository = userRepository;
            this.jwtGenerator = jwtGenerator;
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

        [HttpPost]
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
                    var response = new AccountResponse
                    {
                        Login = user.UserName,
                        Email = user.Email,
                        Role = user.UserRoles.FirstOrDefault(x => x.UserId == user.Id)?.Role.Name,
                        Token = jwtGenerator.CreateToken(identity)
                    };
                    return Json(response);
                }
            }
        }

        [HttpPost("register")]
        public async Task<ActionResult> RegisterUser([FromBody]RegisterUserRequest request)
        {
            if (!CheckObjectForNull.CheckForNull(request))
                return BadRequest();

            var result = await userRepository.AddUserAsync(
                new()
                {
                    Email = request.Email,
                    UserName = request.Login,
                }, request.Password);
            if (result.Succeeded)
            {
                var user = await userRepository.GetUserAsync(request.Login);
                await userRepository.AddToRoleAsync(user, "User");
                var identity = await GetIdentity(request.Login, request.Password);

                return Json(new AccountResponse
                {
                    Email = request.Email,
                    Login = request.Login,
                    Token = jwtGenerator.CreateToken(identity)
                });

            }
            else
            {
                return BadRequest(result.Errors);
            }
        }


    }
}
