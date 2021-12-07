namespace finner.Models.Request
{
    public class AddStoreRequest
    {
        public string name { get; set; }
        public string logo { get; set; }
        public List<string> product { get; set; } = new List<string>();
    }
}