using NOVEL.Model;
using NOVEL.Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http.Routing;
using NOVEL.API.ModelHelper;

namespace NOVEL.API.ViewModels
{
    public class ViewModelFactory
    {
        private UrlHelper _UrlHelper; 
        public ViewModelFactory(HttpRequestMessage request)
        {
            _UrlHelper = new UrlHelper(request);
        }

        
        public AuthorReturnModel Create(Author author, IList<String> books)
        {
            return new AuthorReturnModel
            {
                Url = _UrlHelper.Link("GetAuthorById", new { id = author.Id }),
                Id = author.Id.ToString(),
                Name = author.Name,
                Description = author.Description,
                ImageUrl = author.ImageUrl,
                UserName = author.UserName,
                CreatedOn = author.CreatedOn,
                Books = books
                //Books = authorService.GetAuthors().Where(a => a.Id.Equals(author.Id)).Select(x => x.Name.ToString()).ToList()
            };
        }


        public AuthorReturnWithPaging Create(List<AuthorReturnModel> authors, int totalItem)
        {
            return new AuthorReturnWithPaging
            {
                TotalItem = totalItem,
                Authors = authors
            };
        }

        public CategoryReturnModel Create(Category category)
        {
            return new CategoryReturnModel
            {
                Url = _UrlHelper.Link("GetCategoryById", new { id = category.Id }),
                Id = category.Id.ToString(),
                Name = category.Name
            };
        }
        public ChapterReturnModel Create(Chapter chapter)
        {
            return new ChapterReturnModel
            {
                Url = _UrlHelper.Link("GetChapterById", new { id = chapter.Id }),
                Id = chapter.Id.ToString(),
                Ordinal = chapter.Ordinal,
                Name = chapter.Name,
                Description = chapter.Description,
                Content = chapter.Content,
                TempContent = chapter.TempContent,
                ImageUrl = chapter.ImageUrl,
                UserName = chapter.UserName.ToString(),
                CreatedOn = chapter.CreatedOn,
                IsLocked = chapter.IsLocked,
                BookId = chapter.BookId.ToString()
            };
        }

        public ChapterViewReturnModel Create(Chapter chapter, int chapterTotal)
        {
            return new ChapterViewReturnModel
            {
                Id = chapter.Id.ToString(),
                Ordinal = chapter.Ordinal,
                Name = chapter.Name,
                Content = chapter.Content,
                UserName = chapter.UserName.ToString(),
                CreatedOn = chapter.CreatedOn,
                BookId = chapter.BookId.ToString(),
                ChapterTotal = chapterTotal
            };
        }

        public ChapterListReturnModel Create(Chapter chapter, string bookName)
        {
            return new ChapterListReturnModel
            {
                Id = chapter.Id.ToString(),
                Ordinal = chapter.Ordinal,
                Name = chapter.Name,
                UserName = chapter.UserName.ToString(),
                CreatedOn = chapter.CreatedOn,
                BookId = chapter.BookId.ToString(),
                BookName = bookName
            };
        }

        public ChapterReturnWithPaging Create(List<ChapterListReturnModel> chapters, int totalItem)
        {
            return new ChapterReturnWithPaging
            {
                TotalItem = totalItem,
                Chapters = chapters
            };
        }
        public BookReturnModel Create(Book book, string authorName)
        {
            return new BookReturnModel
            {
                Id = book.Id,
                Name = book.Name,
                Description = book.Description,
                ImageUrl = book.ImageUrl,
                Status = book.Status,
                TotalView = book.TotalView,
                Rating = book.Rating,
                CreatedOn = book.CreatedOn,
                AuthorId = book.AuthorId,
                AuthorName = authorName,
                UserName = book.UserName
                //IsLocked = book.IsLocked
            };
        }

        public BookDetailReturnModel Create(Book book, List<String> categoryName, List<ChapterListReturnModel> chapters, int totalChapter, string authorName)
        {
            return new BookDetailReturnModel
            {
                Id = book.Id,
                Name = book.Name,
                Description = book.Description,
                ImageUrl = book.ImageUrl,
                Status = book.Status,
                TotalView = book.TotalView,
                Rating = book.Rating,
                CreatedOn = book.CreatedOn,
                AuthorId = book.AuthorId,
                AuthorName = authorName,
                UserName = book.UserName,
                TotalChapter = totalChapter,
                CategoryName = categoryName,
                chapters = chapters
            };
        }

        public BookReturnWithPaging Create(List<BookReturnModel> books, int totalItem)
        {
            return new BookReturnWithPaging
            {
                TotalItem = totalItem,
                Books = books
            };
        }
    }
}