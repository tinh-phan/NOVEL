using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NOVEL.Model
{
    public class CategoryOfBook
    {
        [Key, Column(Order = 1)]
        public Guid CategoryId { get; set; }
        public virtual Category Category { get; set; }
        [Key, Column(Order = 2)]
        public Guid BookId { get; set; }
        public virtual Book Book { get; set; }
    }
}
