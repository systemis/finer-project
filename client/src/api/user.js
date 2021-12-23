export default new class User {
  constructor() {
    // let host = 'http://localhost:3000/';
    // let host = 'https://superautospmaket.herokuapp.com/';
    let host = 'https://spmarker.herokuapp.com/';

    this.settings = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }

    this.urls = {
      authenticated: host + 'authenticated',
      login: host + 'authenticated',
      Adminlogin: host + 'authenticated/admin',
      register: host + 'register',
      fbLogin: host + 'fb-login',
      sendOTP: host + 'send/otp',
      donephone: host + 'donephone',
      getInfo: host + 'api/get/info',
      editPayment: host + 'api/edit/payment'
    }
  }

  getInfo(token, fn) {
    fetch(this.urls.getInfo, { ...this.settings, method: 'POST', body: JSON.stringify({ token }) })
      .then(response => response.json())
      .then(json => {
        fn(json.result, json.error)
      })
      .catch(error => fn(error, null));
  }

  authenticated(username, password, fn) {
    fetch(this.urls.authenticated, { ...this.settings, method: 'POST', body: JSON.stringify({ username, password }) })
      .then(response => response.json()).then(json => fn(json.result, json.error))
      .catch(error => fn(null, error));
  }

  login(username, password, fn) {
    fetch(this.urls.authenticated, { ...this.settings, method: 'POST', body: { username, password } })
      .then(response => response.json())
      .then(json => fn(json.error, json.result))
      .catch(error => fn(null, error));
  }


  fbLogin(info, fbToken, fn) {
    fetch(this.urls.fbLogin + `/${fbToken}`, {
      method: 'POST', ...this.settings,
      body: JSON.stringify({ info })
    })
      .then(response => response.json())
      .then(json => fn(json.result, json.error))
      .catch(error => fn(null, error));
  }

  register(info, fn) {
    fetch(this.urls.register, { ...this.settings, method: 'POST', body: JSON.stringify({ ...info }) })
      .then(response => response.json())
      .then(json => {
        fn(json.result, json.error)
      })
      .catch(error => fn(null, error));
  }

  donePhone(id, phone, fn) {
    fetch(`${this.urls.donephone}/${id}/${phone}`, { ...this.settings, method: 'POST' })
      .then(response => response.json())
      .then(json => fn(json.result, json.error))
      .catch(error => {
        console.log('error');
        fn(null, error)
      });
  }

  sendOTP(phone = '', fn) {
    const random = () => Math.floor((Math.random() * 10)).toString();
    const code = random() + random() + random() + random();

    phone = phone.substr(1);
    phone = '+84' + phone;

    console.log(phone);

    fetch(`${this.urls.sendOTP}/${code}/${phone}`, { ...this.settings, method: 'POST' })
      .then(response => response.json())
      .then(json => { console.log(json), fn(code, json.error) })
      .catch(error => {
        console.log('error');
        fn(null, error)
      });
  }


  editPayment(token, paymentType, paymentInfo) {
    return new Promise((resolve, reject) => {
      fetch(this.urls.editPayment, {
        ...this.settings,
        method: 'POST',
        body: JSON.stringify({ token, paymentInfo, paymentType, })
      })
        .then(response => response.json())
        .then(json => {
          if (json.error) reject(json.error);
          resolve(json.result);
        })
        .catch(error => reject(error));
    })
  }
}