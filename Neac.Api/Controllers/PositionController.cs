using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Neac.Api.Attributes;
using Neac.BusinessLogic.Contracts;
using Neac.Common.Dtos;
using Neac.Common.Dtos.PositionDtos;
using Neac.Common.Dtos.UserPositionDtos;
using Neac.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Neac.Api.Controllers
{
    [UserAuthorize]
    [Route("api/[controller]")]
    [ApiController]
    [RoleGroupDescription("Quản lý nhóm tài khoản")]
    public class PositionController : ControllerBase
    {
        private readonly IPositionRepository _positionRepository;
        public PositionController(IPositionRepository positionRepository)
        {
            _positionRepository = positionRepository;
        }

        [RoleDescription("Xem danh sách nhóm tài khoản")]
        [Route("")]
        [HttpGet]
        public async Task<Response<GetListResponseModel<List<UserPositionDto>>>> GetUserPositionsAsync([FromQuery]PositionGetFilterDto filter)
        {
            return await _positionRepository.GetUserPositionsAsync(filter);
        }
        
        [Route("{userPositionId}")]
        [Authorize]
        [HttpGet]
        public async Task<Response<UserPositionDto>> GetUserPositionsByIdAsync([FromRoute] Guid userPositionId)
        {
            return await _positionRepository.GetUserPositionsByIdAsync(userPositionId);
        }

        [Authorize]
        [Route("dropdown")]
        [HttpGet]
        public async Task<Response<List<PositonGetDropdownViewDto>>> GetUserPositionsDropdownAsync()
        {
            return await _positionRepository.GetUserPositionsDropdownAsync();
        }

        [RoleDescription("Thêm mới nhóm tài khoản")]
        [Route("")]
        [HttpPost]
        public async Task<Response<UserPositionDto>> CreateUserPositionsAsync([FromBody] UserPositionDto request)
        {
            return await _positionRepository.CreateUserPositionsAsync(request);
        }

        [RoleDescription("Chỉnh sửa nhóm tài khoản")]
        [Route("{userPositionId}")]
        [HttpPut]
        public async Task<Response<UserPositionDto>> EditUserPositionsAsync([FromRoute] Guid userPositionId, [FromBody] UserPositionDto request)
        {
            request.UserPositionId = userPositionId;
            return await _positionRepository.EditUserPositionsAsync(request);
        }

        [RoleDescription("Xóa nhóm tài khoản")]
        [Route("{userPositionId}")]
        [HttpDelete]
        public async Task<Response<UserPositionDto>> DeleteUserPositionsAsync([FromRoute] Guid userPositionId)
        {
            return await _positionRepository.DeleteUserPositionsAsync(userPositionId);
        }
    }
}
