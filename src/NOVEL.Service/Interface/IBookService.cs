using NOVEL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NOVEL.Service.Interface
{
    public interface IBookService
    {
        IEnumerable<Book> GetBooks();
        IEnumerable<Book> GetBooksByCategory(Guid id);
        Book AddBook(Book book, List<String> categoriesId);
        Book GetBookById(Guid id);
        Book UpdateBook(Book book);
        void DeleteBook(Guid id);
        IEnumerable<Book> GetBookByAuthorId(Guid id);
        IEnumerable<Book> GetBookByCategoryId(Guid id);
    }
}
