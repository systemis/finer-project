import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';

import Logo from '../assets/logo.png';
import _DB from './api/db';

import User from './api/user';
import Addmin from './addmin/api.addmin';

class SplashScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  progressing = value => this.props.dispatch({ type: 'change-progressing', value });

  getUserInfo(token, toLogin) {
    User.getInfo(token, (result, error) => {
      if (error) { console.log('error when get info', error); return toLogin(); }
      if (!result.phone) return this.typePhone(result);

      this.props.dispatch({ type: 'change-userinfo', value: { ...result, token } });
      setTimeout(() => {
        this.props.navigation.navigate('Home');
      }, 500);
    })
  }

  typePhone(result) {
    this.props.dispatch({ type: 'change-userinfo', value: result });
    this.props.navigation.navigate('Phone', {
      background: '#371442c4',
      info: result,
      callback: phone => {
        result.phone = phone;
        User.donePhone(result.id, phone, () => {
          this.progressing(false);
          this.props.dispatch({ type: 'change-token', value: result.token });
          this.props.dispatch({ type: 'change-userinfo', value: result, });
          this.props.navigation.navigate('Home', { result })
        })
      }
    });
  }

  getAddminInfo(token, toLogin) {
    Addmin.getInfo(token, (result, error) => {
      if (error) { console.log('error when get info', error); return toLogin(); }

      this.props.dispatch({ type: 'change-addmin-info', value: { ...result, token } });
      setTimeout(() => {
        this.props.navigation.navigate('AddminHome');
      }, 500);
    })
  }

  async componentDidMount() {
    let tokenBundle = await _DB.getToken();
    let toLogin = () => setTimeout(() => this.props.navigation.navigate('Login'), 500);
    let changeToken = token => this.props.dispatch({ type: 'change-token', value: token });
    if (!tokenBundle || !tokenBundle.token) return toLogin();

    let type = tokenBundle.type;
    let token = tokenBundle.token;

    changeToken(token);
    switch (type) {
      case 'user':
        this.getUserInfo(token, toLogin);
        break;
      case 'addmin':
        this.getAddminInfo(token, toLogin);
        break;
    }
  }

  render() {
    return (
      <View style={{ ...StyleSheet.flatten(StyleSheet.absoluteFillObject), flexDirection: 'row' }}>
        <View style={{ width: '100%', alignSelf: 'center' }}>
          <Image
            source={Logo}
            style={{
              height: 250,
              width: 250,
              alignSelf: 'center',
            }}
          />
        </View>
      </View>
    )
  }
}

export default connect(() => {
  return {}
})(SplashScreen);