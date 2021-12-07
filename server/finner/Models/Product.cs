using MongoDB.Bson; 
using MongoDB.Bson.Serialization.Attributes;

namespace finner.Models
{
    public class Product
    {
        // Id of product
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        
        // Name of product
        [BsonElement("Name")]
        public string Name { get; set; }
        
        // Image url
        [BsonElement("Image")]
        public string Image { get; set; }
        
        // Price
        [BsonElement("Price")]
        public float Price { get; set; }

        // Product qrCode
        [BsonElement("QrCode")]
        public string QrCode { get; set; } = "";
        
        // Store id
        [BsonElement("StoreId")]
        public string StoreId { get; set; }
    }
}