using finner.Models; 

namespace finner.Models.Response
{
    public class PaymentResponse
    {
        public string responseMsg {get; set; }
        public string status { get; set; }
        public Order order { get; set; }
    }
}