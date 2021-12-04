using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using finner.Models;

namespace finner.Controllers
{
    [Route("user")] 
    public class UserController : Controller
    {
        private readonly ILogger<UserController> _logger;

        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet] // GET /user/
        public string getInfo(){
            return "thinh";
        }

        [HttpPut] // PUT /user
        public string update(UpdateUserRequest requestInfo){
            string id = requestInfo.ID;
            System.Console.WriteLine(id);
            return id; 
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View("Error!");
        }
    }
}