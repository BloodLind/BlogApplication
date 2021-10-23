using BlogApi.Identity.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogApi.Identity.Contexts
{
    public class IdentityUsersContext : IdentityDbContext<User, Role, string, IdentityUserClaim<string>,
   UserRole, IdentityUserLogin<string>,
    IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public DbSet<Subscribe> Subscribes {  get; set; }
        public IdentityUsersContext(DbContextOptions<IdentityUsersContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserRole>(userRole =>
            {
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });

           

            builder.Entity<Subscribe>(b =>
            {
                b.HasOne(s => s.Author).WithMany(x => x.Subscribers).HasForeignKey(x => x.AuthorId);
                b.HasOne(s => s.Subscriber).WithMany(x => x.Subscriptions).HasForeignKey( x => x.SubscriberId);
            });
        }
    }
}
