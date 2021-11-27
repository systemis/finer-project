let redux = require('redux');
let _D = require('../src/socket');

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

let storesList = (state = [], action) => {
  if (action.type == 'change-store-list') return action.value;
  return state;
}

let clientInfo = (state = {
  email: 'thinh@gmail.com',
  username: 'systemofpeter',
  name: 'Pham Thinh',
  phone: 090000, pices: '2928193',
  image: 'https://dnsrecord.herokuapp.com/user-avatar.png',
  History: [
    {
      storeName: 'BigC',
      total: 890000,
      userid: "944135032588617_fb",
      products: [
        {
          barcode: '9786048962296',
          count: 1,
          image: "https://i.imgur.com/aoga5eB.jpg",
          name: "Tất cả đã an bài",
          price: 890000,
        }]
    }
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