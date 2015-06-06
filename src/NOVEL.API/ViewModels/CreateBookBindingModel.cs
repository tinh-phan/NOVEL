using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace NOVEL.API.ViewModels
{
    public class CreateBookBindingModel
    {
        [Required]
        [Display(Name = "Name")]
        public string Name { get; set; }
        //[Required]
        [Display(Name = "Description")]
        public string Description { get; set; }
        [Display(Name = "ImageUrl")]
        public string ImageUrl { get; set; }
        [MaxLength(100)]
        [Display(Name = "Status")]
        public string Status { get; set; }
        //[Display(Name = "Total View")]
        //public string TotalView { get; set; }
        //[Display(Name = "Rating")]
        //public int Rating { get; set; }
        [Display(Name = "Author Id")]
        public string AuthorId { get; set; }
        public List<String> CategoriesId { get; set; }
        //[Display(Name = "UserName")]
        //public string UserName { get; set; }
    }
}