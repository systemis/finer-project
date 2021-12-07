using finner.Models;

namespace finner.Interface
{
    public interface IUserDb
    {
        User addUser(User user);
        List<User> getUsers();
        List<User> getUserListByFistName(string firstName);
        User getUserById(string id);
        User getUserByEmail(string email);
    }
}