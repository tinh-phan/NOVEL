using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace NOVEL.Model
{
    public class Chapter
    {
        public Guid Id { get; set; }
        public int Ordinal { get; set; }
        [MaxLength(200)]
        public string Name { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public string TempContent { get; set; }
        public string ImageUrl { get; set; }
        public string UserName { get; set; }
        public DateTime CreatedOn { get; set; }
        public Boolean IsLocked { get; set; }
        public Guid BookId { get; set; }
        public virtual Book Book { get; set; }
    }
}
