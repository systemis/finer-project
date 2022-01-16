using MongoDB.Driver;
using finner.Models;
using finner.Interface;

namespace finner.Services
{
    public class AdminDb : IAdmin
    {
        private readonly IMongoCollection<Admin> collection; 
        public AdminDb() {
            DatabaseDriver driver = new DatabaseDriver();
            collection = driver.Database.GetCollection<Admin>("Admin");
        }
        public Admin getAdminById(string id) {
            return collection.Find(element => element.Id == id).FirstOrDefault(); 
        }
        public Admin addAdmin(Admin admin) {
            collection.InsertOne(admin);
            return admin;
        }
        public Admin updateAdmin(Admin admin) {
            try {
                var result = collection.ReplaceOneAsync(item => item.Id == admin.Id, admin);
                if (result == null) {
                  throw new ArgumentException("Update admin failed !");
                }
                return admin; 
            } catch (Exception e) {
                System.Console.WriteLine(e.Message);
                return null;
            }
        }
    }
}