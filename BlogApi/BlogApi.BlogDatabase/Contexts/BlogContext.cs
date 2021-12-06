using BlogApi.BlogDatabase.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogApi.BlogDatabase.Contexts
{


    //Update-Database -Context BlogContext
    //    Для того что бы сделать миграцию нуждно прописать эту команду в консоле диспетчера пакетов 
    //и закоментить EnsureCreated
    public class BlogContext : DbContext
    {
        public DbSet<Article> Articles { get; set; }
        public DbSet<UserPhoto> UserPhotos { get; set; } 
        public DbSet<Category> Categories { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Like> Likes { get; set; }
       
        public BlogContext(DbContextOptions<BlogContext> options) : base(options)
        {
           //Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }


    }
}
