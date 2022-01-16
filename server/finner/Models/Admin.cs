using MongoDB.Bson; 
using MongoDB.Bson.Serialization.Attributes;

namespace finner.Models
{
    public class Admin
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        
        [BsonElement("StoreId")]
        public string StoreId { get; set; }
        
        [BsonElement("Name")]
        public string Name { get; set; }

        [BsonElement("Orders")]
        public List<String> Orders { get; set; }
    }
}