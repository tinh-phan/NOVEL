using NOVEL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NOVEL.API.ViewModels
{
    public class ChapterReturnModel
    {
        public string Url { get; set; }
        public string Id { get; set; }
        public int Ordinal { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public string TempContent { get; set; }
        public string ImageUrl { get; set; }
        public string UserName { get; set; }
        public DateTime CreatedOn { get; set; }
        public Boolean IsLocked { get; set; }
        public string BookId { get; set; }
    }
}