using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NOVEL.API.ViewModels
{
    public class AuthorReturnWithPaging
    {
        public int TotalItem { get; set; }
        public List<AuthorReturnModel> Authors { get; set; }
    }
}