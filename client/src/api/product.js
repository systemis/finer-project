class Product {
  constructor() {
    // this.host = 'https://superautospmaket.herokuapp.com';
    // this.host = 'http://localhost:19009';
    // this.host = 'https://spmarker.herokuapp.com';
    // this.host = 'http://localhost:19009/';
    this.host = 'https://finer-server.herokuapp.com';

    this.settings = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }

    this.urls = {
      getinfobarcode: `${this.host}/get/info/barcode`,
      payment: `${this.host}/api/payment`
    }
  }

  payment(token, billament, fn) {
    fetch(this.urls.payment, {
      method: 'POST', ...this.settings,
      body: JSON.stringify({ token, billament })
    }).then(response => response.json())
      .then(response => {
        console.log('response', response);

        fn(response.result, response.error)
      })
      .catch(error => fn(null, error))
  }

  findProductByBarcode(storename, barcode, fn) {
    console.log(`${this.urls.getinfobarcode}/${storename}/${barcode}`);
    fetch(`${this.urls.getinfobarcode}/${storename}/${barcode}`, {
      method: 'POST',
      ...this.settings
    })
      .then(response => response.json())
      .then(response => fn(response.result, response.error))
      .catch(error => fn(null, error));
  }
}

export default new Product();