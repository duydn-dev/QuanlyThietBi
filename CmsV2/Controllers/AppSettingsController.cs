using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Cms.Controllers
{
    public class AppSettingsController : Controller
    {
        [HttpGet("/AppSettings.js")]
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("/api/version")]
        public IActionResult Version()
        {
            return Content("1.0");
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
