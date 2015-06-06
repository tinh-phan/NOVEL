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
    [RoutePrefix("api/categories")]
    public class CategoriesController:ApiController
    {
        private ICategoryService categoryService;
        //private IBookService bookService;
        //private ApplicationUserManager _AppUserManager = null;
        private ViewModelFactory _modelFactory;
        public CategoriesController(ICategoryService categoryService)
        {
            this.categoryService = categoryService;

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
        [Route(Name = "GetCategories")]
        [AllowAnonymous]
        public IHttpActionResult GetCategories()
        {
            try
            {
                var categories = categoryService.GetCategories().Select(c => TheModelFactory.Create(c));
                return Ok(categories);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
        [Route("GetCategoryById", Name = "GetCategoryById")]
        [AllowAnonymous]
        public IHttpActionResult GetCategoryById(string categoryId)
        {
            var category = categoryService.GetCategoryById(Guid.Parse(categoryId));
            return Ok(TheModelFactory.Create(category));
        }
        [HttpPost]
        [Route("CreateCategory", Name = "CreateCategory")]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult CreateCategory([FromBody]CreateCategoryBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //cân thêm vào kiểm tra trùng tên thể loại vào đây
            //
            var category = new Category
            {
                Id = Guid.NewGuid(),
                Name = model.Name,
                CreatedOn = DateTime.UtcNow
            };

            categoryService.AddCategory(category);
            return Created(Url.Link("GetCategoryById", new { categoryId = category.Id }), TheModelFactory.Create(category));
        }
        [HttpPost]
        [Route("UpdateCategory", Name = "UpdateCategory")]
        [Authorize]
        public IHttpActionResult UpdateCategory([FromBody]UpdateCategoryBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //Kiểm tra tên ở đây
            //
            var category = categoryService.GetCategoryById(Guid.Parse(model.categoryId));
            if (category == null)
            {
                return NotFound();
            }
            category.Name = model.Name;

            categoryService.UpdateCategory(category);
            return Ok(TheModelFactory.Create(category));
        }
        [HttpGet]
        [Route("DeleteCategory", Name = "DeleteCategory")]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult DeleteCategory(string categoryId)
        {
            try
            {
                categoryService.DeleteCategory(Guid.Parse(categoryId));
                return Ok("Xóa thành công");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
    }
}