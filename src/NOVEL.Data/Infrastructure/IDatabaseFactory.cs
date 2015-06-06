using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NOVEL.Data.Infrastructure
{
    public interface IDatabaseFactory:IDisposable
    {
        ApplicationEntities Get();
    }
}
