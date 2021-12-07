// MongoDB.Driver.dll
#region Assembly MongoDB.Driver, Version=2.14.1.0, Culture=neutral, PublicKeyToken=null
#endregion

using MongoDB.Driver;

namespace finner.Services
{
    public class DatabaseDriver
    {
       private MongoClientSettings settings; 
       private MongoClient client; 
       private IMongoDatabase database; 
       public DatabaseDriver() {
          settings = MongoClientSettings.FromConnectionString("mongodb://finner:finner@cluster0-shard-00-00.lcimu.mongodb.net:27017,cluster0-shard-00-01.lcimu.mongodb.net:27017,cluster0-shard-00-02.lcimu.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-8s96wa-shard-0&authSource=admin&retryWrites=true&w=majority");
          client = new MongoClient(settings);
          database = client.GetDatabase("test");
       }

      public IMongoDatabase Database {
         get { return database; }
      }
    }
}