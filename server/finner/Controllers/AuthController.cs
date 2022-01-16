using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Web;
using finner.Models;
using finner.Utils;
using finner.Services; 

namespace finner.Controllers
{
    [Route("auth")]
    public class AuthController : Controller
    {
        private static string Secret = "ERMN05OPLoDvbTTa/QkqLNMI7cPLguaRyHzyg7n5qNBVjQmtBhz4SzYh4NBVCXi3KJHlSXKP+oi2+bXr6CUYTR==";  
        private UserDb userDb;
        private readonly ILogger<AuthController> _logger;
        public AuthController(ILogger<AuthController> logger)
        {
            _logger = logger;
            userDb = new UserDb();
        }
        public IActionResult Index()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View("Error!");
        }

        [HttpPost("login")]
        public LoginResponse Login(LoginRequest login)
        {
            LoginResponse response = new LoginResponse();
            try {
                var loginResponse = new LoginResponse { };
                LoginRequest loginRequest = new LoginRequest { };
                loginRequest.Email = login.Email.ToLower();
                loginRequest.Password = login.Password;
                
                var exists = userDb.getUserByEmail(loginRequest.Email);
                if (exists == null) {
                    throw new ArgumentException("User is not exists ");
                }
                
                if (loginRequest.Password != exists.HashPassword) {
                    throw new ArgumentException("Password is not match");
                }

                string token = GenerateToken(loginRequest.Email);

                User user = exists; 
                user.HashPassword = "";
                loginResponse.Token = token; 
                return loginResponse; 
            } catch (Exception e) {
                response.responseMsg = e.ToString();
                return response;
            }
        }

        [HttpPost("register")]
        public RegisterResponse Register(RegisterRequest register)
        {
            System.Console.WriteLine(register.email);
            var exists = userDb.getUserByEmail(register.email);
            if(exists != null) {
                return null; 
            }

            User user = new User(); 
            user.Email = register.email; 
            user.FirstName = register.firstName;
            user.LastName = register.lastName;
            user.HashPassword = HashPassword.makeHashPassword(register.password);

            var insertedResult = userDb.addUser(user);
            RegisterResponse response =  new RegisterResponse();
            response.user = insertedResult;
            return response;
        }

        [HttpPost("info")] 
        public string info(LoginRequest login)
        {
            System.Console.WriteLine("return " + login.Email);
            return "Login info";
        }
        public static string GenerateToken(string username) 
        {  
            DateTime issuedAt = DateTime.UtcNow;
            DateTime expires = DateTime.UtcNow.AddMinutes(10);

            var tokenHandler = new JwtSecurityTokenHandler();
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, username)
            });

            var now = DateTime.UtcNow;
            var securityKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.Default.GetBytes(Secret));
            var signingCredentials = new Microsoft.IdentityModel.Tokens.SigningCredentials(securityKey, Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256Signature);

            var token =
                (JwtSecurityToken)
                    tokenHandler.CreateJwtSecurityToken(issuer: "http://localhost:50191", audience: "http://localhost:50191",
                        subject: claimsIdentity, notBefore: issuedAt, expires: expires, signingCredentials: signingCredentials);
            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }  
    }
}