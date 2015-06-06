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
    public class AuthorService:IAuthorService
    {
        private IAuthorRepository authorRepository;
        private IBookRepository bookRepository;
        private IUnitOfWork unitOfWork;

        public AuthorService(IAuthorRepository authorRepository, IBookRepository bookRepository, IUnitOfWork unitOfWork)
        {
            this.authorRepository = authorRepository;
            this.bookRepository = bookRepository;
            this.unitOfWork = unitOfWork;
        }
        public IEnumerable<Author> GetAuthors()
        {
            return authorRepository.GetAll();
        }

        public Author AddAuthor(Author author)
        {
            authorRepository.Add(author);
            SaveChanges();
            return author;
        }

        public Author GetAuthorById(Guid id)
        {
            return authorRepository.GetById(id);
        }

        public Author UpdateAuthor(Author author)
        {
            try
            {
                authorRepository.Update(author);
                SaveChanges();
                return author;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public void DeleteAuthor(Guid id)
        {
            var author = authorRepository.GetById(id);
            if (author != null)
            {
                var book = bookRepository.GetMany(b => b.AuthorId.Equals(id));
                if(book != null)
                {
                    foreach (var item in book)
                    {
                        bookRepository.Delete(item);
                    }
                }
                authorRepository.Delete(author);
                SaveChanges();
            }
            
        }

        public void SaveChanges()
        {
            unitOfWork.SaveChanges();
        }
    }
}
