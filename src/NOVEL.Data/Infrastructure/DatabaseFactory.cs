using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NOVEL.Data.Infrastructure
{
    public class DatabaseFactory:Disposable, IDatabaseFactory
    {
        private ApplicationEntities dataContext;
        public ApplicationEntities Get()
        {
            return dataContext ?? (dataContext = new ApplicationEntities());
            //return dataContext ?? (dataContext = ApplicationEntities.Create());
        }

        protected override void DisposeCore()
        {
            if (dataContext != null)
            {
                dataContext.Dispose();
            }
        }
    }
}
