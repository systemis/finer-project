using System;
using MongoDB.Driver; 
using finner.Models; 

namespace finner.Services
{
    public class StoreDb
    {
        private readonly IMongoCollection<Store> collection; 
        private readonly ProductDb productDb; 
        public StoreDb()
        {
            DatabaseDriver driver = new DatabaseDriver();
            productDb  = new ProductDb(); 
            collection = driver.Database.GetCollection<Store>("stores");
        }
        public List<Store> getStoreList()
        {
            return collection.Find(element => true).ToList(); 
        }
        public Store addStore(Store store) 
        {
            var exists = getStoreByName(store.Name);
            if(exists != null) {
                throw new ArgumentException("Store with name already exists");
            }
            collection.InsertOne(store);
            return store;
        }
        public void AddProduct(Product product)
        {
            var exists = productDb.getProductByQrCode(product.QrCode);
            if(exists != null) {
                throw new ArgumentException("Product with this qr code already exists");
            }

            productDb.addProduct(product);
            List<string> productList = collection.Find(element => element.Id == product.StoreId).FirstOrDefault().Product;
            productList.Append(product.Id);
            var updateFilter = Builders<Store>.Filter.Eq("Product", productList);
            var update = Builders<Store>.Update.Set("Id", product.StoreId);
            var result = collection.UpdateOne(updateFilter, update);
            System.Console.Write("Result when add product: ", result);
        }
        public Store getStoreByName(string name) 
        {
            return collection.Find(element => element.Name == name).FirstOrDefault();
        }
    }
}