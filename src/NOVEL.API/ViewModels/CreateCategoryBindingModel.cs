using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace NOVEL.API.ViewModels
{
    public class CreateCategoryBindingModel
    {
        [Required]
        [Display(Name = "Name")]
        public string Name { get; set; }
    }
}