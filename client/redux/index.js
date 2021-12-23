
// const BigCLogo = require('../assets/bigc.png');
// const VinmartLogo = require('../assets/vinmart.png');
// const Kmartlogo = require('../assets/kmart.png');
// const CoopmartLoogo = require('../assets/coopmart.png');

let redux = require('redux');
let _D = require('../src/socket');

const defaultStoreList = [
  { image: 'BigCLogo', name: 'BigC', id: '29dedc-002dcs-xx2s', products: [
    {
      barcode: '9786048962296',
      count: 1,
      image: "https://i5.walmartimages.com/asr/2084737a-5e73-4b9d-a3b6-b1e864edf2ac.d569755a854ca538903ac21b66b3034c.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      name: "Lego Box",
      price: 8900000,
    }
  ]}, 
  { image: 'VinmartLogo', name: 'Vinmart', id: '29dedc-00dcs-xx2s', products: [], }, 
  { image: 'Kmartlogo', name: 'Kmart', id: '29dedc-002dcs-x2s', products: [], }, 
  { image: 'CoopmartLoogo', name: 'Coopmart', id: '29dedc-02dcs-xx2s', products: [], }, 
]

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
  if (action.type == 'change-store-list') return action.value;
  return state;
}

let clientInfo = (state = {
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
}, action) => {
  if (action.type == 'change-userinfo') return action.value;
  return state;
}

let addminInfo = (state = {}, action) => {
  if (action.type == 'change-addmin-info') return action.value;
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