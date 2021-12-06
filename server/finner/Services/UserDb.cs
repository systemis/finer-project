using MongoDB.Bson; 
using MongoDB.Driver;
using MongoDB.Driver.Linq; 
using finner.Models; 

namespace finner.Services
{
    public class UserDb
    {
        private readonly IMongoCollection<User> collection; 
        public UserDb(){
            DatabaseDriver driver = new DatabaseDriver();
            collection = driver.Database.GetCollection<User>("user");
        }

        public User addUser(User user){
            collection.InsertOne(user);
            return user; 
        }   

        // Get user list
        public List<User> getUsers() => collection.Find(element => true).ToList(); 

        
        // Get user list by email 
        public List<User> getUserListByFistName(string firstName) {
            var userList = collection.Find(element => element.FirstName == firstName).ToList(); 
            return userList; 
        }

        // Get user by id
        public User getUserById(string id) {
            var user = collection.Find(element => element.Id == id).FirstOrDefault();
            return user; 
        }

        // Get user by Email
        public User getUserByEmail(string email) {
            var user = collection.Find(element => element.Email == email).FirstOrDefault();
            return user; 
        }
    }
}