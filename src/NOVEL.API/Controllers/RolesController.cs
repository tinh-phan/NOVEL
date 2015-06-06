using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using NOVEL.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace NOVEL.API.Controllers
{
    [RoutePrefix("api/roles")]
    public class RolesController : BaseApiController
    {
        [Route(Name = "GetRoleById")]
        [Authorize]
        public async Task<IHttpActionResult> GetRole(string id)
        {
            var role = await this.AppRoleManager.FindByIdAsync(id);
            if (role != null)
            {
                return Ok(TheModelFactory.Create(role));
            }

            return NotFound();
        }

        [Route(Name = "GetAllRoles")]
        [Authorize]
        public IHttpActionResult GetAllRoles()
        {
            var roles = this.AppRoleManager.Roles;
            return Ok(roles);
        }

        [Route(Name = "Create")]
        [Authorize(Roles = "Admin")]
        public async Task<IHttpActionResult> Create(CreateRoleBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var role = new IdentityRole { Name = model.Name };

            var result = await this.AppRoleManager.CreateAsync(role);

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            Uri locationHeader = new Uri(Url.Link("GetRoleById", new { id = role.Id }));
            return Created(locationHeader, TheModelFactory.Create(role));
        }

        [Route(Name = "DeleteRole")]
        [Authorize(Roles = "Admin")]
        public async Task<IHttpActionResult> DeleteRole(string id)
        {
            var role = await this.AppRoleManager.FindByIdAsync(id);
            if (role != null)
            {
                IdentityResult result = await this.AppRoleManager.DeleteAsync(role);
                if (!result.Succeeded)
                {
                    return GetErrorResult(result);
                }
                return Ok();
            }
            return NotFound();
        }

        [Route(Name = "ManagerUsersInRole")]
        [Authorize(Roles = "Admin")]
        public async Task<IHttpActionResult> ManagerUsersInRole(UsersInRoleModel model)
        {
            var role = await this.AppRoleManager.FindByIdAsync(model.Id);
            if (role == null)
            {
                ModelState.AddModelError("", "Role does not exist");
                return BadRequest(ModelState);
            }

            foreach (string user in model.EnrolledUsers)
            {
                var appUser = await this.AppUserManager.FindByNameAsync(user);
                if (appUser == null)
                {
                    ModelState.AddModelError("", string.Format("User: {0} does not exist", user));
                    continue;
                }

                if (!this.AppUserManager.IsInRole(user, role.Name))
                {
                    IdentityResult result = await this.AppUserManager.AddToRoleAsync(appUser.Id, role.Name);

                    if (!result.Succeeded)
                    {
                        ModelState.AddModelError("", string.Format("User: {0} could not to be added to role", user));
                    }
                }
            }

            foreach (string user in model.RemovedUsers)
            {
                var appUser = await this.AppUserManager.FindByNameAsync(user);
                if (appUser == null)
                {
                    ModelState.AddModelError("", string.Format("User: {0} does not exists", user));
                    continue;
                }

                IdentityResult result = await this.AppUserManager.RemoveFromRoleAsync(appUser.Id, role.Name);
                if (!result.Succeeded)
                {
                    ModelState.AddModelError("", string.Format("User: {0} could not removed from role", user));
                }
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok();
        }
    }
}