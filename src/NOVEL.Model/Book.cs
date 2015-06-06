using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NOVEL.Model
{
    public class Book
    {
        public Book()
        {
            this.CategoryOfBooks = new HashSet<CategoryOfBook>();
            this.Chapters = new HashSet<Chapter>();
        }
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        [MaxLength(100)]
        public string Status { get; set; }
        public int TotalView { get; set; }
        public int Rating { get; set; }
        public DateTime CreatedOn { get; set; }
        public Guid AuthorId { get; set; }
        public virtual Author Author { get; set; }
        public string UserName { get; set; }
        public virtual ICollection<CategoryOfBook> CategoryOfBooks { get; set; }
        public virtual ICollection<Chapter> Chapters { get; set; }
        public Boolean IsLocked { get; set; }

    }
}
