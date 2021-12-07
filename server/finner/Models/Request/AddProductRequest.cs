namespace finner.Models.Request
{
    public class AddProductRequest
    {
        public string storeId { get; set; }
        public string name { get; set; }
        public string image { get; set; }
        public float  price { get; set; }
        public string qrCode { get; set; }
    }
}