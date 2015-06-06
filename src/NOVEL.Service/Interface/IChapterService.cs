using NOVEL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NOVEL.Service.Interface
{
    public interface IChapterService
    {
        IEnumerable<Chapter> GetChapterByBookId(Guid id);
        IEnumerable<Chapter> GetChapterByUserName(string userName);
        Chapter GetChapterByOrdinal(Guid id, int ordinal);
        Chapter GetChapterById(Guid id);
        Chapter AddChapter(Chapter chapter);
        Chapter UpdateChapter(Chapter chapter);
        void DeleteChapter(Guid id);
    }
}
