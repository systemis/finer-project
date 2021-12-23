const errorMess = require('./errors_messagers');
function sigin(mess) {
  if (errorMess.NONE_EXISTS == mess) return 'User none exists ';

  return '';
}

module.exports = {
  sigin,
}