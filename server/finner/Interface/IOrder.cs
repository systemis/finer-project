using finner.Models; 

namespace finner.Interface
{
    public interface IOrder
    {
        Order getOrderById(string id);
        Order addOrder(Order order);
        Order updateOrder(Order order);
    }
}