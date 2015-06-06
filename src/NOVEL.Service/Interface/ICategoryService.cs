using NOVEL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NOVEL.Service.Interface
{
    public interface ICategoryService
    {
        IEnumerable<Category> GetCategories();
        IEnumerable<Category> GetCategoriesByBook(Guid id);
        Category AddCategory(Category category);
        Category GetCategoryById(Guid id);
        Category UpdateCategory(Category category);
        void DeleteCategory(Guid id);
    }
}
