import productData from './products.json';

export const request = async (url, options) => {
   const settings = {
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
       },
   };

   return new Promise((resolve) => {
      fetch(url, { ...settings, ...options,  })
         .then((response) => response.json())
         .then((res) => resolve(res))
         .catch(() => resolve(null));
   })
}

export default {
   async payment(info) {
      const resource = await request('/payment', { method: 'POST', body: JSON.stringify(info) });
      console.log(resource);
   }, 
   getStatus(info) {

   }, 
   checkStatus(id) {

   }, 
   getProductList(storeId) {
      return productData.filter((item) => item.storeId === storeId);
   }
}

export function fetchProductList(storeId) {
   
}

export function adminAuthenticated(username) {
   return {
      username, 
      storeName: 'BigC', 
   }
}