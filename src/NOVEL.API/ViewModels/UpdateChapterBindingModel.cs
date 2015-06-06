using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace NOVEL.API.ViewModels
{
    public class UpdateChapterBindingModel
    {
        [Required]
        [Display(Name = "Id")]
        [MaxLength(100)]
        public string Id { get; set; }
        [Required]
        [Display(Name = "Ordinal")]
        public int Ordinal { get; set; }
        [Required]
        [Display(Name = "Name")]
        [MaxLength(200)]
        public string Name { get; set; }
        [Display(Name = "Description")]
        public string Description { get; set; }
        [Required]
        [Display(Name = "Content")]
        public string Content { get; set; }
        [Display(Name = "TempContent")]
        public string TempContent { get; set; }
        [Display(Name = "ImageUrl")]
        public string ImageUrl { get; set; }
        [Required]
        [Display(Name = "Is Locked")]
        public Boolean IsLocked { get; set; }
    }
}