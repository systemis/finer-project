using MongoDB.Bson; 
using MongoDB.Bson.Serialization.Attributes;

namespace finner.Models
{
    public class Order
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("ProductId")]
        public string ProductId { get; set; }
        [BsonElement("StoreId")]
        public string StoreId { get; set; }
        [BsonElement("Price")]
        public string Price { get; set; }
        [BsonElement("buyerId")]
        public string BuyerId { get; set; }
        [BsonElement("checkerId")]
        public string checkerId { get; set; }
        [BsonElement("check")]
        public bool check { get; set; }
    }
}