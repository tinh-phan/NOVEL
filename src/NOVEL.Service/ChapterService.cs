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
    public class ChapterService:IChapterService
    {
        private IBookRepository bookRepository;
        private IChapterRepository chapterRepository;
        private IUnitOfWork unitOfWork;

        public ChapterService(IBookRepository bookRepository, IChapterRepository chapterRepository, IUnitOfWork unitOfWork)
        {
            this.bookRepository = bookRepository;
            this.chapterRepository = chapterRepository;
            this.unitOfWork = unitOfWork;
        }
        public IEnumerable<Chapter> GetChapterByBookId(Guid id)
        {
            return chapterRepository.GetMany(c => c.BookId.Equals(id));
        }

        public IEnumerable<Chapter> GetChapterByUserName(string userName)
        {
            return chapterRepository.GetMany(c => c.UserName.Equals(userName));
        }

        public Chapter GetChapterByOrdinal(Guid id, int ordinal)
        {
            var book = bookRepository.GetById(id);
            book.TotalView += 1;
            bookRepository.Update(book);
            SaveChanges();
            return chapterRepository.GetMany(c => c.BookId.Equals(id) && c.Ordinal.Equals(ordinal)).FirstOrDefault();
        }

        public Chapter GetChapterById(Guid id)
        {
            return chapterRepository.GetById(id);
        }

        public Chapter AddChapter(Chapter chapter)
        {
            chapterRepository.Add(chapter);
            SaveChanges();
            return chapter;
        }

        public Chapter UpdateChapter(Chapter chapter)
        {
            try
            {
                chapterRepository.Update(chapter);
                SaveChanges();
                return chapter;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public void DeleteChapter(Guid id)
        {
            var chapter = chapterRepository.GetById(id);
            if (chapter != null)
            {
                chapterRepository.Delete(chapter);
                SaveChanges();
            }
            
        }

        public void SaveChanges()
        {
            unitOfWork.SaveChanges();
        }
    }
}
