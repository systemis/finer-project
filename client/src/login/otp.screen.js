import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

class OTPScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: 0,
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <View style={{
          width: '100%',
          height: 200,
          backgroundColor: 'pink',
          paddingTop: 80,
          paddingLeft: 25,
        }}>
          <TouchableHighlight
            onPress={() => { console.log('goback login'); navigation.goBack() }}
            underlayColor='transparent'
            style={{ width: 100 }}
          ><Icon name='arrowleft' color='black' size={30} /></TouchableHighlight>
          <Text style={{
            color: '#fff',
            fontSize: 30,
            letterSpacing: 3,
          }}>
            Sign Up
          </Text>
        </View>
      )
    }
  }
}