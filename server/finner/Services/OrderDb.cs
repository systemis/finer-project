using MongoDB.Driver;
using finner.Models;
using finner.Interface;

namespace finner.Services
{
    public class OrderDb : IOrder
    {
        private readonly IMongoCollection<Order> collection; 
        public OrderDb() {
            DatabaseDriver driver = new DatabaseDriver();
            collection = driver.Database.GetCollection<Order>("Orders");
        }
        public Order getOrderById(string id) {
            return collection.Find(element => element.Id == id).FirstOrDefault(); 
        }
        public Order addOrder(Order order) {
            collection.InsertOne(order);
            return order; 
        }
        public Order updateOrder(Order order) {
            try {
                var result = collection.ReplaceOneAsync(item => item.Id == order.Id, order);
                if (result == null) {
                  throw new ArgumentException("Update order failed !");
                }
                return order; 
            } catch (Exception e) {
                System.Console.WriteLine(e.Message);
                return null;
            }
        }
    }
}