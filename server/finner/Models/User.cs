
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace finner.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        
        [BsonElement("LastName")]
        public string LastName { get; set; }
        
        [BsonElement("FirstName")]
        public string FirstName { get; set; }
        
        [BsonElement("HashPassword")]
        public string HashPassword { get; set; }

        [BsonElement("Email")]
        public string Email { get; set; }

        [BsonElement("Orders")]
        public string[] Orders { get; set; } = new string[] {}; 
        
        // public User GetDefault() {
        //     User user = new User(); 
        //     user.Orders = new string[] {}; 
        //     user.LastName = LastName;
        //     user.FirstName = FirstName; 
        //     user.HashPassword = HashPassword;
        //     user.Email = Email; 
        //     return user;
        // }
    }
}