namespace finner.Models.Request
{
    public class PaymentRequest
    {
        public string productId { get; set; }
        public string storeId { get; set; }   
        public string userId { get; set; }
    }
}