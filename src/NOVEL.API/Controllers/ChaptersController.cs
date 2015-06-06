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
    [RoutePrefix("api/chapters")]
    public class ChaptersController:ApiController
    {
        private IChapterService chapterService;
        private IBookService bookService;
        private ViewModelFactory _modelFactory;

        public ChaptersController(IChapterService chapterService, IBookService bookService)
        {
            this.chapterService = chapterService;
            this.bookService = bookService;
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
        [Route(Name = "GetChapters")]
        [AllowAnonymous]
        public IHttpActionResult GetChapters(string bookId)
        {
            var chapters = chapterService.GetChapterByBookId(Guid.Parse(bookId)).Where(c => c.IsLocked == false).OrderBy(c => c.Ordinal).Select(c => TheModelFactory.Create(c)).ToList();
            return Ok(chapters);
        }
        [HttpGet]
        [Route("GetChaptersAll", Name = "GetChaptersAll")]
        [AllowAnonymous]
        public IHttpActionResult GetChaptersAll(string bookId, int pageSize, int pageNum)
        {
            string bookName = bookService.GetBookById(Guid.Parse(bookId)).Name.ToString();
            var chapters = chapterService.GetChapterByBookId(Guid.Parse(bookId)).OrderBy(c => c.Ordinal).ToList();
            var results = chapters.Skip((pageNum - 1) * pageSize).Take(pageSize).Select(c => TheModelFactory.Create(c, bookName)).ToList();
            return Ok(TheModelFactory.Create(results, chapters.Count()));
        }
        [HttpGet]
        [Route("GetChapterById", Name = "GetChapterById")]
        [AllowAnonymous]
        public IHttpActionResult GetChapterById(string chapterId)
        {
            var chapter = chapterService.GetChapterById(Guid.Parse(chapterId));
            return Ok(TheModelFactory.Create(chapter));
        }

        //[Route("GetChapterByBookId", Name = "GetChapterByBookId")]
        //[AllowAnonymous]
        //public IHttpActionResult GetChapterByBookId(string bookId)
        //{
        //    var chapter = chapterService.GetChapterByBookId(Guid.Parse(bookId));
        //    return Ok(chapter);
        //}
        [Route("GetChapterByOrdinal", Name = "GetChapterByOrdinal")]
        public IHttpActionResult GetChapterByOrdinal(string bookId, int ordinal)
        {
            var chapter = chapterService.GetChapterByOrdinal(Guid.Parse(bookId), ordinal);
            int chapterTotal = chapterService.GetChapterByBookId(chapter.BookId).Where(c => c.IsLocked == false).Select(c => c.Ordinal).Max();
            return Ok(TheModelFactory.Create(chapter, chapterTotal));
        }
        [Route("GetChapterByUserName", Name = "GetChapterByUserName")]
        [Authorize]
        public IHttpActionResult GetChapterByUserName()
        {
            var chapters = chapterService.GetChapterByUserName(User.Identity.Name);
            return Ok(chapters);
        }
        [Route("CreateChapter", Name = "CreateChapter")]
        [Authorize]
        public IHttpActionResult CreateChapter(CreateChapterBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var book = bookService.GetBookById(model.BookId);
            if (book == null)
            {
                return NotFound();
            }

            var chapter = new Chapter
            {
                Id = Guid.NewGuid(),
                Ordinal = model.Ordinal,
                Name = model.Name,
                Description = "",
                Content = model.Content,
                TempContent = "",
                ImageUrl = "",
                UserName = User.Identity.Name,
                CreatedOn = DateTime.UtcNow,
                IsLocked = true,
                BookId = model.BookId
            };

            chapterService.AddChapter(chapter);
            return Created(Url.Link("GetChapterById", new { id = chapter.Id }), TheModelFactory.Create(chapter));
        }
        [Route("UpdateChapter", Name = "UpdateChapter")]
        [Authorize]
        public IHttpActionResult UpdateChapter(UpdateChapterBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var chapter = chapterService.GetChapterById(Guid.Parse(model.Id));
            if(chapter == null)
            {
                return NotFound();
            }

            chapter.Ordinal = model.Ordinal;
            chapter.Name = model.Name;
            chapter.Description = model.Description;
            chapter.Content = model.Content;
            chapter.TempContent = model.TempContent;
            chapter.ImageUrl = model.ImageUrl;
            chapter.IsLocked = model.IsLocked;

            chapterService.UpdateChapter(chapter);

            return Ok(TheModelFactory.Create(chapter));
        }
        [HttpGet]
        [Route("DeleteChapter", Name = "DeleteChapter")]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult DeleteChapter(string chapterId)
        {
            chapterService.DeleteChapter(Guid.Parse(chapterId));
            return Ok();
        }
    }
}