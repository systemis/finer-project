using finner.Models;
namespace finner.Models
{
    public class LoginResponse
    {
        public LoginResponse()
        {

            this.Token = "";
            this.responseMsg = ""; 
        }

        public string Token { get; set; }
        public string responseMsg { get; set; }

        public User user { get; set; }
    }
}