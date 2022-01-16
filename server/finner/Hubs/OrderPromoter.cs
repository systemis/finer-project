using finner.Models; 
using finner.Services; 
using Microsoft.AspNetCore.SignalR; 

namespace finner.Hubs {
  class OrderPromoterHub : Hub {
    private string confirmUrl = "OC-";
    private string makeConfirmUrl = "order";
    public OrderDb orderDb; 
    public AdminDb adminDb; 
    public OrderPromoterHub() {
      orderDb = new OrderDb();
      adminDb = new AdminDb(); 
    }  
    public async Task sendConfirmation(OrderConfirmRequest request) {
      var adminId = request.adminId; 
      var orderId = request.orderId; 
      var message = new OrderConfirmMessage(); 
      try {
        var orderResult = orderDb.getOrderById(adminId); 
        if (orderResult == null) {
          throw new ArgumentException("Order is not exist in db !");
        }
        var adminResult = adminDb.getAdminById(orderId); 
        if (adminResult == null) {
          throw new ArgumentException("Admin is not exist in db !");
        }

        orderResult.checkerId = adminId; 
        orderResult.check = true; 
        adminResult.Orders.Add(orderId);

        orderDb.updateOrder(orderResult);
        adminDb.updateAdmin(adminResult);

        message.adminId = adminId;
        message.check = true; 
        message.error = null;
        await Clients.All.SendAsync(confirmUrl + orderId, message);
      } catch (Exception e) {
        message.adminId = "";
        message.check = false; 
        message.error = e.Message.ToString();
        await Clients.All.SendAsync(confirmUrl + orderId, message);
      }
    }
  }
}