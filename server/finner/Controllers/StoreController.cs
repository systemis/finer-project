using Microsoft.AspNetCore.Mvc;
using finner.Models;
using finner.Models.Request;
using finner.Models.Response; 
using finner.Services;
namespace finner.Controllers
{
    [Route("store")]
    public class StoreController : Controller
    {
        private readonly ILogger<StoreController> _logger;
        private readonly StoreDb storeDb;
        public StoreController(ILogger<StoreController> logger)
        {
            _logger = logger;
            storeDb = new StoreDb();
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public AddStoreResponse AddNewStore(AddStoreRequest addStoreRequest)
        {
            AddStoreResponse response = new AddStoreResponse();
            try {
                Store store = new Store(); 
                store.Name = addStoreRequest.name;
                store.Logo = addStoreRequest.logo;
                var result = storeDb.addStore(store);
                
                response.store = store;
            } catch(Exception e) {
                response.responseMsg = e.ToString();
            }
            
            return response;
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        
        public IActionResult Error()
        {
            return View("Error!");
        }
    }
}