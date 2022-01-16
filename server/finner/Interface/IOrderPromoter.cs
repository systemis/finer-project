using System.Threading.Tasks; 
using finner.Models; 

namespace finner.Interface {
  public interface IOrderPromoterHub {
    Task sendConfirmation(Admin admin, Order order); 
    Task reciveConfirmation();
  }
}