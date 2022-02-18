using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Neac.Api.Attributes;
using Neac.Common.Dtos;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Neac.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [UserAuthorize]
    [RoleGroupDescription("Quản lý File")]
    public class FileController : ControllerBase
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        public FileController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }
        [Route("upload")]
        [Authorize]
        [HttpPost]
        public async Task<Response<string>> UploadFileAsync()
        {
            var file = Request.Form.Files[0];
            string newFileName = System.IO.Path.GetFileNameWithoutExtension(file.FileName) + DateTime.Now.ToString("ddMMyyyyHHmmss") + Path.GetExtension(file.FileName);
            string filePath = "Uploads\\" + newFileName;
            string vitualPath = System.IO.Path.Combine(_hostingEnvironment.WebRootPath, filePath);
            using (var stream = new FileStream(vitualPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return Response<string>.CreateSuccessResponse(filePath);
        }
        [Route("uploads")]
        [Authorize]
        [HttpPost]
        public async Task<Response<bool>> UploadFilesAsync()
        {
            var file = Request.Form.Files;
            List<Task> tasks = new List<Task>();
            
            foreach (var item in file)
            {
                Task task = Task.Run(async () =>
                {
                    string newFileName = System.IO.Path.GetFileNameWithoutExtension(item.FileName) + DateTime.Now.ToString("ddMMyyyyHHmmss") + Path.GetExtension(item.FileName);
                    string filePath = "Uploads\\" + newFileName;
                    string vitualPath = System.IO.Path.Combine(_hostingEnvironment.WebRootPath, filePath);
                    using (var stream = new FileStream(vitualPath, FileMode.Create))
                    {
                        await item.CopyToAsync(stream);
                    }
                });
                tasks.Add(task);
            }
            Task.WaitAll(tasks.ToArray());
            return Response<bool>.CreateSuccessResponse(true);
        }
    }
}
