using BlogApi.BlogDatabase.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogApi.BlogDatabase.Contexts
{
    public class BlogContext : DbContext
    {
        public DbSet<Article> Articles { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<UserPhoto> UserPhotos { get; set; } 
       
        public BlogContext(DbContextOptions<BlogContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserPhoto>().HasOne(x => x.Photo).WithMany(x => x.UserPhotos)
                .HasForeignKey(x => x.PhotoId).OnDelete(DeleteBehavior.Cascade);
        }


    }
}
