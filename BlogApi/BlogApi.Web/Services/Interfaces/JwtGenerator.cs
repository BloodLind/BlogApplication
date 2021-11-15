using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BlogApi.Web.Services.Interfaces
{
    public class JwtGenerator : IJwtGenerator
    {
        private SymmetricSecurityKey key; //Key: super-mega-puper-key
        public JwtGenerator(IConfiguration configuration)
        {
            key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("super-mega-puper-key"));
        }
        public string CreateToken(ClaimsIdentity identity)
        {

            SigningCredentials credetionals = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credetionals
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
