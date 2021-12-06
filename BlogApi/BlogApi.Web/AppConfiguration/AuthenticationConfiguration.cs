using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Identity;

namespace BlogApi.Web.AppConfiguration
{
    public class AuthenticationConfiguration
    {
        public static void Configuration(IServiceCollection service)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("super-mega-puper-key"));
            service.AddAuthentication().AddCookie().                
                AddJwtBearer(opt =>
                {
                    opt.RequireHttpsMetadata = true;
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateAudience = false,
                        ValidateIssuer = false,
                    };
                }).AddGoogle(options =>
                {
                    options.ClientId = "806642512705-1bkpqv74t9mce4mbef3k9jk33g35u4mi.apps.googleusercontent.com";
                    options.ClientSecret = "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";
                    options.SaveTokens = false;
                    options.AuthorizationEndpoint += "?prompt=consent";
                });
            
        }
    }
}
