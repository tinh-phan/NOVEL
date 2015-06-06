using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NOVEL.Service.Interface;
using NOVEL.Model;
using NOVEL.Data.Repositories;
using NOVEL.Data.Infrastructure;

namespace NOVEL.Service
{
    public class CategoryService:ICategoryService
    {
        private ICategoryRepository categoryRepository;
        private ICategoryOfBookRepository categoryOfBookRepository;
        private IUnitOfWork unitOfWork;
        public CategoryService(ICategoryRepository categoryRepository, ICategoryOfBookRepository categoryOfBookRepository, IUnitOfWork unitOfWork)
        {
            this.categoryRepository = categoryRepository;
            this.categoryOfBookRepository = categoryOfBookRepository;
            this.unitOfWork = unitOfWork;
        }

        public IEnumerable<Category> GetCategories()
        {
            return categoryRepository.GetAll();
        }

        public IEnumerable<Category> GetCategoriesByBook(Guid id)
        {
            var listCategoryId = categoryOfBookRepository.GetMany(c => c.BookId.Equals(id)).Select(c => c.CategoryId).ToList();
            var categories = categoryRepository.GetMany(c => listCategoryId.Contains(c.Id));
            return categories;
        }
        public Category AddCategory(Category category)
        {
            categoryRepository.Add(category);
            SaveChanges();
            return category;
        }

        public Category GetCategoryById(Guid id)
        {
            return categoryRepository.GetById(id);
        }

        public Category UpdateCategory(Category category)
        {
            try
            {
                categoryRepository.Update(category);
                SaveChanges();
                return category;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public void DeleteCategory(Guid id)
        {
            var category = categoryRepository.GetById(id);
            if (category != null)
            {
                var categoryOfBook = categoryOfBookRepository.GetMany(c => c.BookId.Equals(id));
                if(categoryOfBook != null)
                {
                    foreach (var item in categoryOfBook)
                    {
                        categoryOfBookRepository.Delete(item);
                    }
                }
                
                categoryRepository.Delete(category);
                SaveChanges();
            }
            
        }

        public void SaveChanges()
        {
            unitOfWork.SaveChanges();
        }
    }
}
