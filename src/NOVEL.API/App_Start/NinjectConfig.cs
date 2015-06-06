using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ninject;
using Ninject.Web;
using System.Reflection;
using NOVEL.Data.Infrastructure;
using NOVEL.Data.Repositories;
using NOVEL.Service.Interface;
using NOVEL.Service;

namespace NOVEL.API
{
    public static class NinjectConfig
    {
        public static Lazy<IKernel> CreateKernel = new Lazy<IKernel>(() =>
        {
            var kernel = new StandardKernel();
            kernel.Load(Assembly.GetExecutingAssembly());

            RegisterServices(kernel);

            return kernel;
        });

        private static void RegisterServices(KernelBase kernel)
        {
            kernel.Bind<IDatabaseFactory>().To<DatabaseFactory>().InSingletonScope();
            kernel.Bind<IUnitOfWork>().To<UnitOfWork>().InSingletonScope();
            kernel.Bind<IAuthorRepository>().To<AuthorRepository>().InSingletonScope();
            kernel.Bind<IBookRepository>().To<BookRepository>().InSingletonScope();
            kernel.Bind<ICategoryOfBookRepository>().To<CategoryOfBookRepository>().InSingletonScope();
            kernel.Bind<ICategoryRepository>().To<CategoryRepository>().InSingletonScope();
            kernel.Bind<IChapterRepository>().To<ChapterRepository>().InSingletonScope();
            //
            kernel.Bind<IBookService>().To<BookService>().InSingletonScope();
            kernel.Bind<IAuthorService>().To<AuthorService>().InSingletonScope();
            kernel.Bind<ICategoryService>().To<CategoryService>().InSingletonScope();
            kernel.Bind<IChapterService>().To<ChapterService>().InSingletonScope();

            //kernel.Bind<IDatabaseFactory>().To<DatabaseFactory>();
            //kernel.Bind<IUnitOfWork>().To<UnitOfWork>();
            //kernel.Bind<IAuthorRepository>().To<AuthorRepository>();
            //kernel.Bind<IBookRepository>().To<BookRepository>();
            //kernel.Bind<ICategoryOfBookRepository>().To<CategoryOfBookRepository>();
            //kernel.Bind<ICategoryRepository>().To<CategoryRepository>();
            //kernel.Bind<IChapterRepository>().To<ChapterRepository>();
            ////
            //kernel.Bind<IBookService>().To<BookService>();
            //kernel.Bind<IAuthorService>().To<AuthorService>();
            //kernel.Bind<ICategoryService>().To<CategoryService>();
            //kernel.Bind<IChapterService>().To<ChapterService>();
        }
    }
}