using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using NOVEL.API.Infrastructure;
using NOVEL.Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Net;
using System.Net.Http;
using NOVEL.API.ViewModels;
using NOVEL.Model;

namespace NOVEL.API.Controllers
{
    [RoutePrefix("api/authors")]
    public class AuthorsController:ApiController
    {
        private IAuthorService authorService;
        private IBookService bookService;
        //private ApplicationUserManager _AppUserManager = null;
        private ViewModelFactory _modelFactory;
        public AuthorsController(IAuthorService authorService, IBookService bookService)
        {
            this.authorService = authorService;
            this.bookService = bookService;
        }
        //protected ApplicationUserManager AppUserManager
        //{
        //    get
        //    {
        //        return _AppUserManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
        //    }
        //}

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
        
        [Route(Name = "GetAuthors")]
        [AllowAnonymous]
        public IHttpActionResult GetAuthors()
        {
            //var authors = authorService.GetAuthors().Where(a => a.IsLocked == false).Select(a => _modelFactory.Create(a));

            var authors = authorService.GetAuthors().Where(a => a.IsLocked == false).Select(a => TheModelFactory.Create(a, Books(a.Id)));
            return Ok(authors);
        }

        [Route("GetAuthorsAll", Name = "GetAuthorsAll")]
        [AllowAnonymous]
        public IHttpActionResult GetAuthorsAll(int pageSize, int pageNum)
        {
            //var authors = authorService.GetAuthors().Where(a => a.IsLocked == false).Select(a => _modelFactory.Create(a));

            var authors = authorService.GetAuthors().Select(a => TheModelFactory.Create(a, Books(a.Id)));
            return Ok(TheModelFactory.Create(authors.Skip((pageNum - 1) * pageSize).Take(pageSize).ToList(), authors.Count()));
        }

        private IList<String> Books(Guid id)
        {
            IList<String> books;
            books = bookService.GetBooks().Where(a => a.AuthorId.Equals(id)).Select(x => x.Name.ToString()).ToList();
            return books;
        }

        [Route("GetAuthorById", Name = "GetAuthorById")]
        [AllowAnonymous]
        public IHttpActionResult GetAuthorById(string authorId)
        {
            var author = authorService.GetAuthorById(Guid.Parse(authorId));
            return Ok(TheModelFactory.Create(author, Books(author.Id)));
        }
        [Route("CreateAuthor", Name = "CreateAuthor")]
        [Authorize]
        public IHttpActionResult CreateAuthor(CreateAuthorBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var author = new Author
            {
                Id = Guid.NewGuid(),
                Name = model.Name,
                Description = model.Description,
                ImageUrl = model.ImageUrl,
                UserName = User.Identity.Name.ToString(),
                CreatedOn = DateTime.UtcNow,
                IsLocked = true
            };

            authorService.AddAuthor(author);
            return Created(Url.Link("GetAuthorById", new { id = author.Id }), TheModelFactory.Create(author, Books(author.Id)));
        }
        [Route("UpdateAuthor", Name = "UpdateAuthor")]
        [Authorize]
        public IHttpActionResult UpdateAuthor(UpdateAuthorBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var author = authorService.GetAuthorById(Guid.Parse(model.authorId));
            if (author == null)
            {
                return NotFound();
            }
            author.Name = model.Name;
            author.Description = model.Description;
            author.ImageUrl = model.ImageUrl;
            //author.IsLocked = model.IsLocked;
            authorService.UpdateAuthor(author);
            return Ok(TheModelFactory.Create(author, Books(author.Id)));
        }
        [HttpGet]
        [Route("DeleteAuthor", Name = "DeleteAuthor")]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult DeleteAuthor(string authorId)
        {
            authorService.DeleteAuthor(Guid.Parse(authorId));
            return Ok();
        }

    }
}