class MainAPI {
  constructor() {
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
      getAllStoresList: host + 'api/get/stores'
    }
  }

  getAllStoresList(token) {
    return new Promise((resolve, reject) => {
      fetch(this.urls.getAllStoresList, {
        ...this.settings,
        method: 'POST',
        body: JSON.stringify({ token, })
      })
        .then(response => response.json()).then(json => {
          if (json.error) return reject(json.error);
          resolve(json.result);
        })
        .catch(error => reject(error));
    })
  }
}

export default new MainAPI();