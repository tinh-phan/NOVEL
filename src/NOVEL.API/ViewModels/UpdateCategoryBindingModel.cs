using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace NOVEL.API.ViewModels
{
    public class UpdateCategoryBindingModel
    {
        [Required]
        [Display(Name = "categoryId")]
        public string categoryId { get; set; }
        [Required]
        [Display(Name = "Name")]
        public string Name { get; set; }
    }
}