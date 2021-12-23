function format(s = '') {
  if (typeof s == 'number') s = s.toString()
  s = s.split('');
  var kens = 0;
  for (var i = s.length - 1; i >= 0; i--) {
    kens++;
    if (kens == 3) {
      s[i] = '.' + s[i];
      kens = 0;
    }
  }

  s = s.toString();
  while (s.indexOf(',') >= 0) {
    s = s.replace(',', '');
  }

  if (s.split('')[0] == '.') s = s.replace('.', '');
  return s;
}

function formatCardNumber(s = '') {
  if (typeof s == 'number') s = s.toString()
  s = s.split('');
  var kens = 0;
  for (var i = s.length - 1; i >= 0; i--) {
    kens++;
    if (kens == 4) {
      s[i] = ' ' + s[i];
      kens = 0;
    }
  }

  s = s.toString();
  while (s.indexOf(',') >= 0) {
    s = s.replace(',', '');
  }

  if (s.split('')[0] == '.') s = s.replace('.', '');
  return s;
}

export const FormatPrice = format;
export const FormatCard = formatCardNumber;