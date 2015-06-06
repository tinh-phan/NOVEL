using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NOVEL.API.ViewModels
{
    public class BookReturnWithPaging
    {
        public int TotalItem { get; set; }
        public List<BookReturnModel> Books { get; set; }

    }
}