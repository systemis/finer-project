namespace finner.Utils
{
    public class HashPassword 
    {
        public static string makeHashPassword(string password) {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(password);
            var hashCode = System.Convert.ToBase64String(plainTextBytes);
            return hashCode; 
        }

        public static bool compareHashPassword(string password, string hashPassword) {
            return makeHashPassword(password) == hashPassword;
        }
    }
}