using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Neac.BusinessLogic.Contracts;
using Neac.BusinessLogic.UnitOfWork;
using Neac.Common;
using Neac.Common.Dtos;
using Neac.Common.Dtos.PositionDtos;
using Neac.DataAccess;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Neac.BusinessLogic.Repository
{
    public class PositionRepository : IPositionRepository
    {
        private readonly IMapper _mapper;
        private readonly ILogRepository _logRepository;
        private readonly IUnitOfWork _unitOfWork;
        public PositionRepository(ILogRepository logRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _logRepository = logRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Response<PositonGetDropdownViewDto>> CreateAsync(PositonGetDropdownViewDto request)
        {
            try
            {
                request.UserPositionId = Guid.NewGuid();
                var mapped = _mapper.Map<PositonGetDropdownViewDto, UserPosition>(request);
                await _unitOfWork.GetRepository<UserPosition>().Add(mapped);
                await _unitOfWork.SaveAsync();
                return Response<PositonGetDropdownViewDto>.CreateSuccessResponse(request);
            }
            catch(Exception ex)
            {
                await _logRepository.ErrorAsync(ex);
                return Response<PositonGetDropdownViewDto>.CreateErrorResponse(ex);
            }
        }

        public async Task<Response<Guid>> DeleteAsync(Guid id)
        {
            try
            {
                var userPosition = await _unitOfWork
                        .GetRepository<UserPosition>()
                        .GetByExpression(n => n.UserPositionId == id)
                        .FirstOrDefaultAsync();

                if(userPosition == null)
                {
                    await _logRepository.ErrorAsync(new Exception($"Chức vụ có id = {id} không tồn tại"));
                    return Response<Guid>.CreateErrorResponse(new Exception($"Chức vụ có id = {id} không tồn tại"));
                }
                await _unitOfWork.GetRepository<UserPosition>().Delete(userPosition);
                await _unitOfWork.SaveAsync();
                return Response<Guid>.CreateSuccessResponse(id);
            }
            catch (Exception ex)
            {
                await _logRepository.ErrorAsync(ex);
                return Response<Guid>.CreateErrorResponse(ex);
            }
        }

        public async Task<Response<GetListResponseModel<List<UserPosition>>>> GetUserPositionsAsync(string filter)
        {
            try
            {
                var request = JsonConvert.DeserializeObject<PositionGetFilterDto>(filter);
                var query = _unitOfWork.GetRepository<UserPosition>()
                                .GetAll()
                                .WhereIf(!string.IsNullOrEmpty(request.TextSearch), n => n.UserPositionName.Contains(request.TextSearch));

                GetListResponseModel<List<UserPosition>> responseData = new GetListResponseModel<List<UserPosition>>(query.Count(), request.PageSize);
                var result = await query
                    .OrderByDescending(n => n.CreatedDate)
                    .Skip(request.PageSize * (request.PageIndex - 1)).Take(request.PageSize)
                    .ToListAsync();
                return Response<GetListResponseModel<List<UserPosition>>>.CreateSuccessResponse(responseData);
            }
            catch(Exception ex)
            {
                await _logRepository.ErrorAsync(ex);
                return Response<GetListResponseModel<List<UserPosition>>>.CreateErrorResponse(ex);
            }
        }

        public async Task<Response<List<PositonGetDropdownViewDto>>> GetUserPositionsDropdownAsync()
        {
            try
            {
                var data = await _unitOfWork.GetRepository<UserPosition>().GetAll().ToListAsync();
                return Response<List<PositonGetDropdownViewDto>>.CreateSuccessResponse(_mapper.Map<List<UserPosition>, List<PositonGetDropdownViewDto>>(data));
            }
            catch(Exception ex)
            {
                await _logRepository.ErrorAsync(ex);
                return Response<List<PositonGetDropdownViewDto>>.CreateErrorResponse(ex);
            }
        }

        public async Task<Response<PositonGetDropdownViewDto>> UpdateAsync(PositonGetDropdownViewDto request)
        {
            try
            {
                var userPosition = await _unitOfWork
                        .GetRepository<UserPosition>()
                        .GetByExpression(n => n.UserPositionId == request.UserPositionId)
                        .FirstOrDefaultAsync();

                if (userPosition == null)
                {
                    await _logRepository.ErrorAsync(new Exception($"Chức vụ có id = {request.UserPositionId} không tồn tại"));
                    return Response<PositonGetDropdownViewDto>.CreateErrorResponse(new Exception($"Chức vụ có id = {request.UserPositionId} không tồn tại"));
                }
                var mapped = _mapper.Map<PositonGetDropdownViewDto, UserPosition>(request);
                await _unitOfWork.GetRepository<UserPosition>().Update(userPosition);
                await _unitOfWork.SaveAsync();
                return Response<PositonGetDropdownViewDto>.CreateSuccessResponse(request);
            }
            catch (Exception ex)
            {
                await _logRepository.ErrorAsync(ex);
                return Response<PositonGetDropdownViewDto>.CreateErrorResponse(ex);
            }
        }
    }
}
