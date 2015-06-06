using NOVEL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NOVEL.Service.Interface
{
    public interface IUserService
    {
        ApplicationUser GetUserByEmail(string email);
        ApplicationUser RegisterUser(ApplicationUser user);
    }
}
