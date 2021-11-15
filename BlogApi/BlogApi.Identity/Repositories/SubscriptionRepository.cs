using BlogApi.Identity.Contexts;
using BlogApi.Identity.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogApi.Identity.Repositories
{
    public class SubscriptionRepository
    {
        private readonly IdentityUsersContext context;
        private readonly DbSet<Subscribe> table;

        public SubscriptionRepository(IdentityUsersContext context)
        {
            this.context = context;
            table = context.Set<Subscribe>();
        }

        public IQueryable<Subscribe> GetAll()
        {
            return table;
        }

        public Subscribe Get(Guid id)
        {
            return table.Find(id);
        }

        public void Delete(Subscribe subscription)
        {
            table.Remove(subscription);
            context.SaveChanges();
        }
        
        public void Delete(Guid id)
        {
            table.Remove(Get(id));
            context.SaveChanges();
        }

        public void SaveChanges()
        {
            context.SaveChanges();
        }

        public void CreateOrUpdate(Subscribe entity, Guid id = default(Guid))
        {
            var target = new Subscribe
            {
                Id = id
            };
            if (target.Id != default(Guid))
            {
                var entry = table.Attach(target);
                foreach (var item in entity.GetType().GetProperties())
                    entry.Entity
                        .GetType()
                        .GetProperty(item.Name)
                        .SetValue(entry.Entity, item.GetValue(entity, null), null);

                entry.State = EntityState.Modified;
            }
            else
                table.Add(entity);



        }
    }
}
