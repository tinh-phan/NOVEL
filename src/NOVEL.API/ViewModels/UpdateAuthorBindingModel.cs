using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace NOVEL.API.ViewModels
{
    public class UpdateAuthorBindingModel
    {
        [Required]
        [Display(Name = "authorId")]
        public string authorId { get; set; }
        [Required]
        [Display(Name = "Name")]
        public string Name { get; set; }
        [Required]
        [Display(Name = "Description")]
        public string Description { get; set; }
        [Display(Name = "Image Link")]
        public string ImageUrl { get; set; }
        //[Required]
        //[Display(Name = "Is Locked")]
        //public bool IsLocked { get; set; }
    }
}