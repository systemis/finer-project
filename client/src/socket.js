import Client from 'socket.io-client'
class Socket {
  constructor() {
    // this.host = 'http://localhost:19009';
    this.strs = { onDoneCheckBill: 'onDoneCheckBill', }
    // this.host = 'https://spmarker.herokuapp.com';
    // this.host = 'http://localhost:19009/';
    this.host = 'https://finer-server.herokuapp.com/';
    this.io = Client(this.host);
  }

  test() {
    console.log('Start test ...');
    this.io.emit('new_message', { data: 'titl' });
  }

  onDoneCheckBill(code, fn) {
    this.io.on(this.strs.onDoneCheckBill + `/${code}`, data => fn(data))
  }
}

module.exports = Socket; 