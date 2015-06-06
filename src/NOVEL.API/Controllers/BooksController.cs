using NOVEL.API.ViewModels;
using NOVEL.Model;
using NOVEL.Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace NOVEL.API.Controllers
{
    [RoutePrefix("api/books")]
    public class BooksController:ApiController
    {
        private IBookService bookService;
        private ICategoryService categoryService;
        private IAuthorService authorService;
        private IChapterService chapterService;
        private ViewModelFactory _modelFactory;

        public BooksController(IBookService bookService, ICategoryService categoryService, IAuthorService authorService, IChapterService chapterService)
        {
            this.bookService = bookService;
            this.categoryService = categoryService;
            this.authorService = authorService;
            this.chapterService = chapterService;
        }
        protected ViewModelFactory TheModelFactory
        {
            get
            {
                if (_modelFactory == null)
                {
                    _modelFactory = new ViewModelFactory(this.Request);
                }
                return _modelFactory;
            }
        }

        [Route(Name = "GetBooks")]
        //[Authorize]
        public IHttpActionResult GetBooks(int pageSize, int pageNum)
        {
            try
            {
                int totalItems = bookService.GetBooks().Count();
                var books = bookService.GetBooks().Skip((pageNum - 1) * pageSize).Take(pageSize).Select(c => TheModelFactory.Create(c, CreateAuthorName(c.AuthorId))).ToList();
                
                return Ok(TheModelFactory.Create(books, totalItems));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        [Route("GetBooksAll", Name = "GetBooksAll")]
        //[Authorize]
        public IHttpActionResult GetBooksAll()
        {
            try
            {
                //int totalItems = bookService.GetBooks().Count();
                var books = bookService.GetBooks().Select(c => TheModelFactory.Create(c, CreateAuthorName(c.AuthorId))).ToList();
                return Ok(TheModelFactory.Create(books, books.Count));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpGet]
        [Route("FindBookByName", Name = "FindBookByName")]
        //[Authorize]
        public IHttpActionResult FindBookByName(string requestString, int pageSize, int pageNum)
        {
            try
            {
                var books = bookService.GetBooks().Where(b => b.IsLocked == false && b.Name.ToLower().Contains(requestString.ToLower())).Select(c => TheModelFactory.Create(c, CreateAuthorName(c.AuthorId))).ToList();
                int totalItems = bookService.GetBooks().Count();
                //books.Skip((pageNum - 1) * pageSize).Take(pageSize);
                return Ok(TheModelFactory.Create((books.Skip((pageNum - 1) * pageSize).Take(pageSize).ToList()), totalItems));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Route("GetBooksByCategoryName", Name = "GetBooksByCategoryName")]
        [AllowAnonymous]
        public IHttpActionResult GetBooksByCategoryName(string categoryName)
        {
            var categoryId = categoryService.GetCategories().Where(c => c.Name.Equals(categoryName)).FirstOrDefault().Id;
            var books = bookService.GetBookByCategoryId(categoryId).Select(c => TheModelFactory.Create(c, CreateAuthorName(c.AuthorId)));

            return Ok(books);
        }

        [Route("GetBooksByCategory", Name = "GetBooksByCategory")]
        [AllowAnonymous]
        public IHttpActionResult GetBooksByCategory(string id)
        {
            var books = bookService.GetBookByCategoryId(Guid.Parse(id)).Select(c => TheModelFactory.Create(c, CreateAuthorName(c.AuthorId)));
            return Ok(books);
        }

        [Route("GetBooksByAuthorName", Name = "GetBooksByAuthorName")]
        [AllowAnonymous]
        public IHttpActionResult GetBooksByAuthorName(string authorName)
        {
            var authorId = authorService.GetAuthors().Where(a => a.Name.Equals(authorName)).FirstOrDefault().Id;
            if (authorId == null)
            {
                return BadRequest("Tên tác giả không tồn tại");
            }
            //var books = bookService.GetBookByAuthorId(authorId).Select(c => TheModelFactory.Create(c, CreateAuthorName(c.AuthorId)));
            var books = bookService.GetBookByAuthorId(authorId).Select(c => TheModelFactory.Create(c, authorName));
            return Ok(books);
        }

        [Route("GetBooksByAuthor", Name = "GetBooksByAuthor")]
        [AllowAnonymous]
        public IHttpActionResult GetBooksByAuthor(string id)
        {
            var books = bookService.GetBookByAuthorId(Guid.Parse(id)).Select(c => TheModelFactory.Create(c, CreateAuthorName(c.AuthorId)));
            return Ok(books);
        }

        [Route("GetBookById", Name = "GetBookById")]
        [AllowAnonymous]
        public IHttpActionResult GetBookById(string bookId)
        {
            var book = bookService.GetBookById(Guid.Parse(bookId));
            return Ok(TheModelFactory.Create(book, CreateAuthorName(book.AuthorId)));
        }

        [Route("GetBookByName", Name = "GetBookByName")]
        [AllowAnonymous]
        public IHttpActionResult GetBookByName(string bookName, int pageSize, int pageNum)
        {
            try
            {
                var book = bookService.GetBooks().Where(c => c.Name.Equals(bookName)).FirstOrDefault();
                var categoriesName = categoryService.GetCategoriesByBook(book.Id).Select(c => c.Name).ToList();
                var chapters = chapterService.GetChapterByBookId(book.Id).OrderBy(c => c.Ordinal).ToList();
                var results = chapters.Skip((pageNum - 1) * pageSize).Take(pageSize).Select(c => TheModelFactory.Create(c, bookName)).OrderBy(c => c.Ordinal).ToList();
                return Ok(TheModelFactory.Create(book, categoriesName, results, chapters.Count(), CreateAuthorName(book.AuthorId)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        private string CreateAuthorName(Guid id)
        {
            return authorService.GetAuthorById(id).Name.ToString();
        }
        [HttpPost]
        [Route("CreateBook", Name = "CreateBook")]
        [Authorize]
        public IHttpActionResult CreateBook(CreateBookBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var tempBook = bookService.GetBooks().Where(c => c.Name.Equals(model.Name)).FirstOrDefault();
            if (tempBook != null)
            {
                return BadRequest("Tên đã tồn tại");
            }
            var book = new Book
            {
                Id = Guid.NewGuid(),
                Name = model.Name,
                Description = model.Description,
                ImageUrl = model.ImageUrl,
                Status = model.Status,
                TotalView = 1,
                Rating = 1,
                CreatedOn = DateTime.UtcNow,
                AuthorId = Guid.Parse(model.AuthorId),
                UserName = User.Identity.Name,
                IsLocked = false
            };
            bookService.AddBook(book, model.CategoriesId);

            return Created(Url.Link("GetBookById", new { id = book.Id }), TheModelFactory.Create(book, CreateAuthorName(book.AuthorId)));
        }

        //public IHttpActionResult CreateBook(CreateBookBindingModel model)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }
        //    var tempBook = bookService.GetBooks().Where(c => c.Name.Equals(model.Name)).FirstOrDefault();
        //    if (tempBook != null)
        //    {
        //        return BadRequest("Tên đã tồn tại");
        //    }
        //    var book = new Book
        //    {
        //        Id = Guid.NewGuid(),
        //        Name = model.Name,
        //        Description = model.Description,
        //        ImageUrl = model.ImageUrl,
        //        Status = model.Status,
        //        TotalView = "1",
        //        Rating = 1,
        //        CreatedOn = DateTime.UtcNow,
        //        AuthorId = Guid.Parse(model.AuthorId),
        //        UserName = User.Identity.Name,
        //        IsLocked = false
        //    };

        //    bookService.AddBook(book);
        //    return Created(Url.Link("GetBookById", new { id = book.Id }), TheModelFactory.Create(book, CreateAuthorName(book.AuthorId)));
        //}
        //
        [HttpPost]
        [Route("UpdateBook", Name = "UpdateBook")]
        [Authorize]
        public IHttpActionResult UpdateBook(UpdateBookBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var book = bookService.GetBookById(Guid.Parse(model.BookId));
            if (book == null)
            {
                return BadRequest("Không tìm thấy kết quả");
            }
            book.Name = model.Name;
            book.Description = model.Description;
            book.ImageUrl = model.ImageUrl;
            book.Status = model.Status;
            book.AuthorId = Guid.Parse(model.AuthorId);

            bookService.UpdateBook(book);
            return Ok(TheModelFactory.Create(book, CreateAuthorName(book.AuthorId)));
        }
        [HttpGet]
        [Route("DeleteBook", Name = "DeleteBook")]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult DeleteBook(string bookId)
        {
            bookService.DeleteBook(Guid.Parse(bookId));
            return Ok();
        }
    }
}