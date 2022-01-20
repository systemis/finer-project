class API {
  constructor() {
    // let host = 'http://localhost:3000/';
    // let host = 'https://superautospmaket.herokuapp.com/';
    // let host = 'https://spmarker.herokuapp.com/';
    // let host = 'http://localhost:19009/';
    let host = 'https://finer-server.herokuapp.com/';

    this.settings = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }

    this.urls = {
      authenticated: host + 'authenticated-addmin',
      getInfo: host + 'api/get/addmin',
      getReckoning: host + 'api/get/reckoning',
      checkdoneReckoning: host + 'api/checkdone',
    }
  }

  getInfo(token, fn) {
    fetch(this.urls.getInfo, { ...this.settings, method: 'POST', body: JSON.stringify({ token }) })
      .then(response => response.json())
      .then(json => fn(json.result, json.error))
      .catch(error => fn(error, null));
  }

  authenticated(storeName = 'BigC', username, password, fn) {
    fetch(this.urls.authenticated, {
      ...this.settings, method: 'POST', body: JSON.stringify({
        storeName, username, password,
      })
    }).then(response => {
      console.log(response);;
      return response.json()
    }).then(json => fn(json.result, json.error))
      .catch(error => fn(null, error));
  }

  getReckoning(token, storeKey, code, fn) {
    fetch(this.urls.getReckoning, {
      ...this.settings,
      method: 'POST',
      body: JSON.stringify({ token, code, storeKey, })
    })
      .then(response => response.json())
      .then(json => fn(json.result, json.error))
      .catch(error => fn(error, null));
  }

  checkdoneReckoning(token, code, plus, fn) {
    fetch(this.urls.checkdoneReckoning, {
      ...this.settings,
      method: 'POST',
      body: JSON.stringify({ token, code, plus })
    })
      .then(response => response.json())
      .then(json => fn(json.result, json.error))
      .catch(error => fn(error, null));
  }

}

export default new API();