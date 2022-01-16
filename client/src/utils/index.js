export default {
   handlePayment: async (data) => {
      return new Promise((resolve) => {
         resolve({ ...data, id: Math.random().toString() });
      })
   }
}; 