using BlogApi.BlogDatabase.Contexts;
using BlogApi.BlogDatabase.Models;
using BlogApi.Identity.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogApi.Web.DataCreators
{
    public class BlogTestData
    {
        public static void Initialize(BlogContext context, UserRepository userRepository)
        {
            if (!context.Articles.Any())
            {
                var user = userRepository.Users.ToList().FirstOrDefault();
                context.Articles.AddRange(
                    new Article
                    {
                        Id = Guid.NewGuid(),
                        Title = "About Site",
                        Photo = null,
                        PreviewPhotoId = null,
                        InnerData = "This site is created by not aboba!",
                        PublicationDate = DateTime.Now,
                        AuthorId = Guid.Parse(user?.Id)
                    }
                    );
                context.SaveChanges();
            }
        }
    }
}
