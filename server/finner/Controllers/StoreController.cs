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
        private readonly ProductDb productDb; 
        private readonly UserDb userDb; 
        public StoreController(ILogger<StoreController> logger)
        {
            _logger = logger;
            storeDb = new StoreDb();
            productDb = new ProductDb();
            userDb = new UserDb(); 
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

        [HttpGet]
        public GetStoreResponse GetStore()
        {
            List<Store> store_list = storeDb.getStoreList();
            GetStoreResponse response = new GetStoreResponse(); 
            response.store_list = store_list; 
            return response; 
        }

        [HttpPost("/payment")]
        public PaymentResponse payment(PaymentRequest paymentRequest) {
            var paymentResponse = new PaymentResponse();
            try {
                string storeId = paymentRequest.storeId; 
                if (storeDb.getStoreById(storeId) == null) {
                    throw new ArgumentException("Store is's exists !");
                }

                string productId = paymentRequest.productId;
                if (productDb.getProductById(productId) == null) {
                    throw new ArgumentException("Product is's exists !");   
                }

                string userId = paymentRequest.userId;
                if (userDb.getUserById(userId) == null) {
                    throw new ArgumentException("Cannot find any user with this user");
                }

                Order order = new Order(); 
                order.BuyerId = userId; 
                order.StoreId = storeId; 
                order.ProductId = productId;

                paymentResponse.status = "SUCCESS"; 
                paymentResponse.responseMsg = "Payment successfully!";
                paymentResponse.order = order; 
                return paymentResponse;
            } catch (Exception e) {
                paymentResponse.status = "FAILED"; 
                paymentResponse.responseMsg =  e.ToString(); 
                return paymentResponse;
            }
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        
        public IActionResult Error()
        {
            return View("Error!");
        }
    }
}