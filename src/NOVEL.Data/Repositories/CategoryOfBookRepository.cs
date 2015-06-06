using NOVEL.Data.Infrastructure;
using NOVEL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NOVEL.Data.Repositories
{
    public class CategoryOfBookRepository : RepositoryBase<CategoryOfBook>, ICategoryOfBookRepository
    {
        public CategoryOfBookRepository(IDatabaseFactory dbFactory)
            :base(dbFactory)
        {

        }
    }
}
