﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace NOVEL.API.Models
{
    public class CreateRoleBindingModel
    {
        [Required]
        [StringLength(256, ErrorMessage = "The {0} must be least {2} characters long.", MinimumLength = 2)]
        [Display(Name = "Role Name")]
        public string Name { get; set; }
    }
}