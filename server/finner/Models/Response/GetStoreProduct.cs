using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace finner.Models.Response
{
    public class GetStoreProductResponse
    {
        public string responseMsg { get; set; }
        public List<Product> productList; 
    }
}