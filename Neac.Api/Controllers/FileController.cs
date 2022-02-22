using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Neac.Api.Attributes;
using Neac.Common.Dtos;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Neac.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [UserAuthorize]
    [RoleGroupDescription("Quản lý File")]
    public class FileController : ControllerBase
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IConfiguration _configuration; 
        public FileController(IWebHostEnvironment hostingEnvironment, IConfiguration configuration)
        {
            _hostingEnvironment = hostingEnvironment;
            _configuration = configuration;
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
        
        [Route("get_token")]
        [Authorize]
        [HttpGet]
        public async Task<string> GetTokenAsync(string fname, string storageApiUrl)
        {
            if (string.IsNullOrEmpty(storageApiUrl))
                storageApiUrl = _configuration.GetSection("storageApiUrl").Value;
            var url = storageApiUrl + "?fn=get_token&secret_key=duyweoispqoetukaodeptraiwuwqDS2sls1s109s1-saiksk&filename=" + fname + "&companyId=" + 1;
            var _tokenJson = JsonConvert.DeserializeObject<ExpandoObject>(MakeRequest(url, HttpMethod.Get));
            if (_tokenJson != null)
            {
                return _tokenJson.First().Value.ToString();
            }
            return "";
        }


        private static string MakeRequest(string Url, HttpMethod method, string PostData = "", string type = "application/x-www-form-urlencoded; charset=utf-8")
        {
            var request = (HttpWebRequest)WebRequest.Create(Url);

            request.Method = method.ToString();
            request.ContentType = type;
            if (method == HttpMethod.Post)
            {
                byte[] bytes = Encoding.UTF8.GetBytes(PostData);
                request.ContentLength = bytes.Length;
                using (Stream requestStream = request.GetRequestStream())
                {
                    requestStream.Write(bytes, 0, bytes.Length);
                }
            }
            var responseValue = string.Empty;
            using (var response = (HttpWebResponse)request.GetResponse())
            {

                if (response.StatusCode != HttpStatusCode.OK)
                {
                    var message = String.Format("Request failed. Received HTTP {0}", response.StatusCode);
                }

                using (var responseStream = response.GetResponseStream())
                {
                    if (responseStream != null)
                        using (var reader = new StreamReader(responseStream))
                        {
                            responseValue = reader.ReadToEnd();
                        }
                }
            }
            return responseValue;
        }
    }
}
