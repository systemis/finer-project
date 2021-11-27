let redux = require('redux');

let navigation = (state = '', action) => {
  if (action.type == 'change-navigation') {
    return action.value;
  }

  return state;
}

let reducer = redux.combineReducers({
  navigation: navigation,
})

module.exports = redux.createStore(reducer);