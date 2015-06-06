using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace NOVEL.API.ViewModels
{
    public class UpdateBookBindingModel
    {
        [Required]
        [Display(Name = "BookId")]
        public string BookId { get; set; }
        [Required]
        [Display(Name = "Name")]
        public string Name { get; set; }
        [Required]
        [Display(Name = "Description")]
        public string Description { get; set; }
        [Display(Name = "ImageUrl")]
        public string ImageUrl { get; set; }
        [MaxLength(100)]
        [Display(Name = "Status")]
        public string Status { get; set; }
        [Display(Name = "AuthorId")]
        public string AuthorId { get; set; }
    }
}