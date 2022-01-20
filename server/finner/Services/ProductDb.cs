using MongoDB.Bson; 
using MongoDB.Driver; 
using finner.Models;

namespace finner.Services
{
    public class ProductDb
    {
        private readonly IMongoCollection<Product> collection;     
        public ProductDb(){
            DatabaseDriver driver = new DatabaseDriver();
            collection = driver.Database.GetCollection<Product>("product");
        }
        public Product addProduct(Product product) {
            try {
                var exists = getProductByQrCode(product.QrCode);
                if(exists != null) {
                    throw new ArgumentException("Product width qrcode already exists");
                }

                collection.InsertOne(product);
                return product; 
            }catch(Exception e) {
                System.Console.WriteLine("Error Add Product: ", e);
                return null;
            }
        }
        public List<Product> getStoreProduct(string storeId) {
        return collection.Find(element => element.StoreId == storeId).ToList(); 
        }
        public Product getProductByQrCode(string qrCode) {
            return collection.Find(element => element.QrCode == qrCode).FirstOrDefault();
        }
        public Product getProductById(string id) {
            return collection.Find(element => element.Id == id).FirstOrDefault();
        }
    }
}