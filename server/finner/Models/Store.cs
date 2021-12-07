using MongoDB.Bson; 
using MongoDB.Bson.Serialization.Attributes;

namespace finner.Models
{
    public class Store
    {
        // Id of store
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        
        // Name of store
        [BsonElement("Name")]
        public string Name { get; set; }
        
        // Image url of logo
        [BsonElement("Logo")]
        public string Logo { get; set; }

        // Product ids
        [BsonElement("Product")]
        public List<string> Product { get; set; } = new List<string>();
        
        // Order
        [BsonElement("Orders")]
        public List<string> Orders { get; set; } = new List<string>();
    }
}