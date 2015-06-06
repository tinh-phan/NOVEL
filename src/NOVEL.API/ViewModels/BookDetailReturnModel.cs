using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NOVEL.API.ViewModels
{
    public class BookDetailReturnModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public string Status { get; set; }
        public int TotalView { get; set; }
        public int Rating { get; set; }
        public DateTime CreatedOn { get; set; }
        public Guid AuthorId { get; set; }
        public string AuthorName { get; set; }
        public string UserName { get; set; }
        //public string CategoryName { get; set; }
        public int TotalChapter { get; set; }
        public List<String> CategoryName { get; set; }
        public List<ChapterListReturnModel> chapters { get; set; }
    }
}