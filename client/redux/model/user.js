const defaultClientInfo = {
   email: 'amorriscodes@gmail.com',
   username: 'systemofpeter',
   name: 'Stephen',
   phone: '0905631878', pices: 0,
   image: 'https://thumbor.forbes.com/thumbor/711x711/https://specials-images.forbesimg.com/imageserve/613df8e8d679a21b766a1636/bigbun-2/960x0.jpg?fit=scale',
   Orders: [
     // {
     //   storeName: 'BigC',
     //   total: 8900000,
     //   userid: "944135032588617_fb",
     //   products: [
     //     {
     //       barcode: '9786048962296',
     //       count: 1,
     //       image: "https://i5.walmartimages.com/asr/2084737a-5e73-4b9d-a3b6-b1e864edf2ac.d569755a854ca538903ac21b66b3034c.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
     //       name: "Lego Box",
     //       price: 8900000,
     //     }]
     // }
   ]
 };
 

 export const clientInfo = (state=defaultClientInfo, action) => {
   if (action.type == 'change-userinfo') {
      return action.value;
    }
    return state;
 }