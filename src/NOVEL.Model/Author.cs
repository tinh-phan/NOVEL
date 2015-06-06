using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NOVEL.Model
{
    public class Author
    {
        public Author()
        {
            this.Books = new HashSet<Book>();
        }
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public string UserName { get; set; }
        public DateTime CreatedOn { get; set; }
        public Boolean IsLocked { get; set; }
        public ICollection<Book> Books { get; set; }
    }
}
