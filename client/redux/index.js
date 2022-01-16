let redux = require('redux');
let _D = require('../src/socket');

const defaultStoreList = [
  { image: 'BigCLogo', name: 'BigC', id: '29dedc-002dcs-xx2s', products: [
    {
      barcode: '978604896223396',
      count: 0,
      image: "https://www.lego.com/cdn/cs/set/assets/blt6631c3930abc6526/21324.jpg?fit=bounds&format=jpg&quality=80&width=1500&height=1500&dpr=1",
      name: "Lego Box",
      price: 890000,
    },
    {
      barcode: '97863892892296',
      count: 0,
      image: "https://chiaki.vn/upload/product/2016/12/may-bay-dieu-khien-tu-xa-mini-m440-15122016015840.png",
      name: "Máy Bay Điều Khiển Từ Xa Mini M44",
      price: 500000,
    },
    {
      barcode: '97863892892297',
      count: 0,
      image: "https://product.hstatic.net/200000338811/product/sku-11_4224d3e09ae44380baed9d544e2e43ce_grande.png",
      name: "Hộp cà phê coffe house",
      price: 120000,
    },
  ]}, 
  { image: 'VinmartLogo', name: 'Vinmart', id: '29dedc-00dcs-xx2s', products: [], }, 
  { image: 'Kmartlogo', name: 'Kmart', id: '29dedc-002dcs-x2s', products: [], }, 
  { image: 'CoopmartLoogo', name: 'Coopmart', id: '29dedc-02dcs-xx2s', products: [], }, 
]

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

let tokenReducer = (state = '', action) => {
  if (action.type == 'change-token') return action.value;
  return state;
}

let progressingReducer = (state = false, action) => {
  if (action.type == 'change-progressing') {
    return action.value;
  }

  return state;
}

let navigation = (state = '', action) => {
  if (action.type == 'change-navigation') {
    return action.value;
  }
  return state;
}

let storesList = (state = defaultStoreList, action) => {
  if (action.type == 'change-store-list') {
    return action.value;
  }
  return state;
}

let clientInfo = (state = defaultClientInfo, action) => {
  if (action.type == 'change-userinfo') {
    return action.value;
  }
  return state;
}

let addminInfo = (state = {}, action) => {
  if (action.type == 'change-addmin-info') {
    return action.value;
  }
  return state;
}

let reducer = redux.combineReducers({
  progressing: progressingReducer,
  token: tokenReducer,
  navigation: navigation,
  info: clientInfo,
  addminInfo: addminInfo,
  storesList: storesList,
  Socket: () => {
    return new _D();
  },
})

let store = redux.createStore(reducer);

module.exports = store;