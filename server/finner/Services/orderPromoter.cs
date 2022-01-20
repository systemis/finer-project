using System.Threading.Tasks;
using finner.Models; 
using Microsoft.AspNetCore.SignalR; 

namespace finner.Services {
  class OrderPromoterHub : Hub {
    public OrderDb orderDb; 
    public AdminDb adminDb; 
    public OrderPromoterHub() {
      orderDb = new OrderDb();
      adminDb = new AdminDb(); 
    }  
    public async Task sendConfirmation(Order order, Admin admin) {
      var message = new OrderConfirmMessage(); 
      try {

        message.adminId = admin.Id; 
        message.check = true; 
        await Clients.All.SendAsync("order-confirm-" + order.Id, message);
      } catch (Exception e) {
        message.adminId = ""; 
        message.check = false; 
        await Clients.All.SendAsync("order-confirm-" + order.Id, message);
      }
    }
  }
}