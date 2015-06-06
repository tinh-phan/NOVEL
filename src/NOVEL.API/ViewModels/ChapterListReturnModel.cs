using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NOVEL.API.ViewModels
{
    public class ChapterListReturnModel
    {
        public string Id { get; set; }
        public int Ordinal { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public DateTime CreatedOn { get; set; }
        public string BookId { get; set; }
        public string BookName { get; set; }
    }
}