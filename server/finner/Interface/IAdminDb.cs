using finner.Models; 

namespace finner.Interface
{
    public interface IAdmin
    {
        Admin getAdminById(string id);
        Admin addAdmin(Admin order);
        Admin updateAdmin(Admin order);
    }
}