using Microsoft.AspNet.Identity.EntityFramework;
using NOVEL.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NOVEL.Data
{
    public class ApplicationEntities:IdentityDbContext<ApplicationUser>
    {
        public ApplicationEntities()
            : base("ApplicationDb", throwIfV1Schema: false)
        {
            Configuration.ProxyCreationEnabled = false;
            Configuration.LazyLoadingEnabled = false;
        }

        public DbSet<Author> Authors { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<CategoryOfBook> CategoryOfBooks { get; set; }
        public DbSet<Chapter> Chapters { get; set; }

        public static ApplicationEntities Create()
        {
            return new ApplicationEntities();
        }
    }
}
