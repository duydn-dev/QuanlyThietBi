using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;
using Neac.BusinessLogic.Contracts;
using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Threading.Tasks;

namespace Neac.Api.Attributes
{
    public class UserAuthorizeAttribute : Attribute, IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var allowAttr = (context.ActionDescriptor as ControllerActionDescriptor).MethodInfo.GetCustomAttributes(typeof(AllowAnonymousAttribute), false).FirstOrDefault();
            if (allowAttr != null)
            {
                await next();
                return;
            }
            var authenOnly = (context.ActionDescriptor as ControllerActionDescriptor).MethodInfo.GetCustomAttributes(typeof(AuthorizeAttribute), false).FirstOrDefault();
            if (string.IsNullOrEmpty(context.HttpContext.User.Identity.Name))
            {
                context.Result = new ContentResult()
                {
                    StatusCode = 401,
                    ContentType = "application/json",
                    Content = "Bạn chưa đăng nhập !"
                };
                return;
            }
            if (authenOnly != null && string.IsNullOrEmpty(context.HttpContext.User.Identity.Name)){
                context.Result = new ContentResult()
                {
                    StatusCode = 401,
                    ContentType = "application/json",
                    Content = "Bạn chưa đăng nhập !"
                };
                return;
            }
            else if (authenOnly != null && !string.IsNullOrEmpty(context.HttpContext.User.Identity.Name))
            {
                await next();
                return;
            }
            else
            {
                var cacheService = context.HttpContext.RequestServices.GetRequiredService<IMemoryCache>();
                var userService = context.HttpContext.RequestServices.GetRequiredService<IUserRepository>();
                var responseUser = await userService.GetUserByUserName(context.HttpContext.User.Identity.Name);
                // là admin thì cho qua
                if (responseUser.ResponseData.UserPosition.IsAdministrator.Value)
                {
                    await next();
                }
                else
                {
                    // không phải admin thì check quyền
                    var roles = responseUser.ResponseData?.UserRoles?.Select(n => n?.Role?.RoleCode);

                    string controllerName = context.ActionDescriptor.RouteValues["controller"].ToString();
                    string actionName = context.ActionDescriptor.RouteValues["action"].ToString();

                    //var identityRoles = context.HttpContext.User.Claims.Select(n => n.Value);
                    if (!roles.Contains(controllerName + "-" + actionName))
                    {
                        context.Result = new ContentResult()
                        {
                            StatusCode = 401,
                            ContentType = "application/json",
                            Content = "bạn không có quyền vào trang này !"
                        };
                        return;
                    }
                    await next();
                }
            }
        }
    }
}
