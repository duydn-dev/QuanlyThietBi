using Neac.Common.Dtos;
using Neac.Common.Dtos.PositionDtos;
using Neac.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Neac.BusinessLogic.Contracts
{
    public interface IPositionRepository
    {
        Task<Response<GetListResponseModel<List<UserPosition>>>> GetUserPositionsAsync(string filter);
        Task<Response<List<PositonGetDropdownViewDto>>> GetUserPositionsDropdownAsync();
        Task<Response<PositonGetDropdownViewDto>> CreateAsync(PositonGetDropdownViewDto request);
        Task<Response<PositonGetDropdownViewDto>> UpdateAsync(PositonGetDropdownViewDto request);
        Task<Response<Guid>> DeleteAsync(Guid id);

    }

}
