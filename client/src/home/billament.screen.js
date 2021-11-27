import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { } from 'expo';

// import QRCode from 'react-native-qrcode';
// import QRCode from 'react-native-qrcode-svg';

import QRCode from 'react-native-qrcode-svg';

class Billament extends React.Component {
  static navigationOptions = {
    header: null,
  }

  state = {
    text: 'http://facebook.github.io/react-native/',
  };

  componentDidMount() {

  }

  render() {
    return (
      <View>
        <QRCode
          value="Just some string value"
          // logo={{ uri: base64Logo }}
          logoSize={30}
          logoBackgroundColor='transparent'
        />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5,
  }
});


export default Billament