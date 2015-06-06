using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NOVEL.API.ViewModels
{
    public class ChapterReturnWithPaging
    {
        public int TotalItem { get; set; }
        public List<ChapterListReturnModel> Chapters { get; set; }
    }
}