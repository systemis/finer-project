namespace finner.Models
{
    public class RegisterResponse
    {
        public RegisterResponse(){
            this.responseMsg = new HttpResponseMessage() { StatusCode = System.Net.HttpStatusCode.Unauthorized };        
        }

        public HttpResponseMessage responseMsg { get; set; }

        public User user { get; set; }
    }
}