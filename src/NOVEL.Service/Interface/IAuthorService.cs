using NOVEL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NOVEL.Service.Interface
{
    public interface IAuthorService
    {
        IEnumerable<Author> GetAuthors();
        Author AddAuthor(Author author);
        Author GetAuthorById(Guid id);
        Author UpdateAuthor(Author author);
        void DeleteAuthor(Guid id);
    }
}
