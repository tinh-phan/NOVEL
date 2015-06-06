using NOVEL.Model;
using NOVEL.Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NOVEL.API.ModelHelper
{
    public class ModelHelpers
    {
        private IAuthorService authorService;
        public ModelHelpers()
        {

        }
        public ModelHelpers(IAuthorService authorService)
            :this()
        {
            this.authorService = authorService;
        }

        public string CreateAuthorName(Guid id)
        {
            return authorService.GetAuthorById(id).Name.ToString();
        }
    }
}