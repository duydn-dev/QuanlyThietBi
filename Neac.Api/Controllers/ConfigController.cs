using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Neac.Api.Attributes;

namespace Neac.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [UserAuthorize]
    [RoleGroupDescription("Quản lý cấu hình")]
    public class ConfigController : ControllerBase
    {

    }
}
