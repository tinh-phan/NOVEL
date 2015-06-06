using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using NOVEL.Data;
using NOVEL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NOVEL.API.Infrastructure
{
    public class ApplicationUserManager:UserManager<ApplicationUser>
    {
        public ApplicationUserManager(IUserStore<ApplicationUser> store)
            :base(store)
        {

        }
        public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            var appDbContext = context.Get<ApplicationEntities>();
            var appUserManager = new ApplicationUserManager(new UserStore<ApplicationUser>(appDbContext));
            appUserManager.UserValidator = new UserValidator<ApplicationUser>(appUserManager)
            {
                AllowOnlyAlphanumericUserNames = true,
                RequireUniqueEmail = true
            };

            //Thay đổi chính sách của Password

            //appUserManager.PasswordValidator = new PasswordValidator
            //hoặc
            appUserManager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                //Không bắt buộc ký tự đặc biệt
                RequireNonLetterOrDigit = false,
                RequireDigit = false,
                RequireLowercase = true,
                RequireUppercase = true
            };
            return appUserManager;
        }
    }
}