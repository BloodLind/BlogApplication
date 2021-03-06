using BlogApi.BlogDatabase.Contexts;
using BlogApi.BlogDatabase.Models;
using BlogApi.BlogDatabase.Repositories;
using BlogApi.Core.Infrastructure.Interfaces;
using BlogApi.Identity.Contexts;
using BlogApi.Identity.Models;
using BlogApi.Identity.Repositories;
using BlogApi.Web.AppConfiguration;
using BlogApi.Web.Services;
using BlogApi.Web.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogApi.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddMvc(options =>
            {
                options.EnableEndpointRouting = false;
            });

            services.AddDbContext<BlogContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddControllersWithViews();
            services.AddDbContext<IdentityUsersContext>(options =>
               options.UseSqlServer(Configuration.GetConnectionString("IdentityConnection")));
            services.AddIdentity<User, Role>(options => 
            { 
                options.Stores.MaxLengthForKeys = 128; 
            })
              .AddEntityFrameworkStores<IdentityUsersContext>()
             .AddDefaultTokenProviders();
            services.AddDistributedMemoryCache();
            services.AddSession();


            AuthenticationConfiguration.Configuration(services);
            IdentityBuilder identityBuilder = services.AddIdentityCore<User>(options =>
            {
                // Password settings.
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 4;
                options.Password.RequiredUniqueChars = 0;

                // Lockout settings.
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.AllowedForNewUsers = true;

                // User settings.
                options.User.AllowedUserNameCharacters =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
                options.User.RequireUniqueEmail = true;
            });

            services.AddScoped<IdentityUsersContext, IdentityUsersContext>();
            services.AddScoped<DbContext, BlogContext>();
            services.AddScoped<IRepository<Article>, ArticleRepository>();
            services.AddScoped<IRepository<Category>, CategoryRepository>();
            services.AddScoped<IRepository<Like>, LikesRepository>();
            services.AddScoped<IRepository<Comment>, CommentsRepository>();
            services.AddScoped<IRepository<UserPhoto>, UserPhotoRepository>();
            services.AddScoped<SubscriptionRepository, SubscriptionRepository>();
            services.AddSingleton<IJwtGenerator>(new JwtGenerator(Configuration));

            identityBuilder.AddRoles<Role>();
            //identityBuilder.AddUserManager<UserManager<User>>();
            //identityBuilder.AddRoleManager<RoleManager<Role>>();

            services.AddScoped<RoleRepository, RoleRepository>();
            services.AddScoped<UserRepository, UserRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
           
            app.UseHttpsRedirection();

            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseRouting();
            app.UseSession();

            app.UseAuthorization();
            app.UseAuthentication();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
