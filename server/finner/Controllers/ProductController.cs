using Microsoft.AspNetCore.Mvc;
using finner.Models.Response;
using finner.Models.Request;
using finner.Services;
using finner.Models;

namespace finner.Controllers
{
    [Route("product")]
    public class ProductController : Controller
    {
        private readonly ILogger<ProductController> _logger;
        private readonly ProductDb productDb; 
        public ProductController(ILogger<ProductController> logger)
        {
            _logger = logger;
            productDb = new ProductDb();
        }

        public IActionResult Index()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View("Error!");
        }
        [HttpPost]
        public AddProductResponse AddNewProduct(AddProductRequest addProductRequest)
        {
            AddProductResponse response = new AddProductResponse();
            try {
                Product product = new Product(); 
                product.Name = addProductRequest.name;
                product.Image = addProductRequest.image; 
                product.QrCode = addProductRequest.qrCode; 
                product.Price = addProductRequest.price; 
                var result = productDb.addProduct(product);
                response.product = result;
            } catch(Exception e) {
                response.responseMsg = e.ToString();
            }
            
            return response;
        }
        [HttpPost]
        public GetProductResponse GetProduct(GetProductRequest getProductRequest)
        {
            GetProductResponse response = new GetProductResponse();
            try {
                var exists = productDb.getProductById(getProductRequest.id);
                if (exists == null) {
                    throw new AggregateException("Product with id isn't already exist!");
                }
                response.product = exists;
            } catch(Exception e) {
                response.responseMsg = e.ToString();
            }
            
            return response;
        }
    }
}