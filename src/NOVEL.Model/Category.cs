using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NOVEL.Model
{
    public class Category
    {
        public Category()
        {
            this.CategoryOfBooks = new HashSet<CategoryOfBook>();
        }
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedOn { get; set; }
        public virtual ICollection<CategoryOfBook> CategoryOfBooks { get; set; }
    }
}
