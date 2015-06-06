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
    public class BookService:IBookService
    {
        private IBookRepository bookRepository;
        private ICategoryRepository categoryRepository;
        private ICategoryOfBookRepository categoryOfBookRepository;
        private IChapterRepository chapterRepository;
        private IUnitOfWork unitOfWork;

        public BookService(IBookRepository bookRepository, ICategoryRepository categoryRepository, ICategoryOfBookRepository categoryOfBookRepository, IChapterRepository chapterRepository, IUnitOfWork unitOfWork)
        {
            this.bookRepository = bookRepository;
            this.categoryRepository = categoryRepository;
            this.categoryOfBookRepository = categoryOfBookRepository;
            this.chapterRepository = chapterRepository;
            this.unitOfWork = unitOfWork;
        }
        public IEnumerable<Book> GetBooks()
        {
            return bookRepository.GetAll();
        }

        public IEnumerable<Book> GetBooksByCategory(Guid id)
        {
            var listBookId = categoryOfBookRepository.GetMany(c => c.CategoryId.Equals(id)).Select(c => c.BookId).ToList();
            var books = bookRepository.GetMany(c => listBookId.Contains(c.Id));
            return books;
        }

        public Book AddBook(Book book, List<String> categoriesId)
        {
            bookRepository.Add(book);
            SaveChanges();
            if (categoriesId != null)
            {
                
                foreach (var categoryId in categoriesId)
                {
                    var category = categoryRepository.GetById(Guid.Parse(categoryId));
                    if (category != null)
                    {
                        CategoryOfBook categoryOfBook = new CategoryOfBook
                        {
                            BookId = book.Id,
                            CategoryId = Guid.Parse(categoryId)
                        };
                        categoryOfBookRepository.Add(categoryOfBook);
                        SaveChanges();
                    }
                }
            }
            
            return book;
        }

        public Book GetBookById(Guid id)
        {
            return bookRepository.GetById(id);
        }

        public Book UpdateBook(Book book)
        {
            try
            {
                bookRepository.Update(book);
                SaveChanges();
                return book;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void DeleteBook(Guid id)
        {
            var book = bookRepository.GetById(id);
            if(book != null)
            {
                var categoryOfBook = categoryOfBookRepository.GetMany(c => c.BookId.Equals(id));
                if (categoryOfBook != null)
                {
                    foreach (var item in categoryOfBook)
                    {
                        categoryOfBookRepository.Delete(item);
                    }
                }
                
                var chapter = chapterRepository.GetMany(c => c.BookId.Equals(id));
                if(chapter != null)
                {
                    foreach (var chapterItem in chapter)
                    {
                        chapterRepository.Delete(chapterItem);
                    }
                }
                bookRepository.Delete(book);
                SaveChanges();
            }
            
        }

        public IEnumerable<Book> GetBookByAuthorId(Guid id)
        {
            return bookRepository.GetMany(b => b.AuthorId.Equals(id)).ToList();
        }

        public IEnumerable<Book> GetBookByCategoryId(Guid id)
        {
            var listBookId = categoryOfBookRepository.GetMany(c => c.CategoryId.Equals(id)).Select(c => c.BookId).ToList();
            var books = bookRepository.GetAll();
            //var result = from b in book
            //        where listBookId.Contains<Guid>(b.Id)
            //        select b;
            var result = books.Where(b => listBookId.Any(l => l == b.Id));
            return result.ToList();
        }

        public void SaveChanges()
        {
            unitOfWork.SaveChanges();
        }
    }
}
