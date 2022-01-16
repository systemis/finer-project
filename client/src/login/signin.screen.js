import React from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/AntDesign';
import EIcon from 'react-native-vector-icons/EvilIcons';

import styles from './fields/styles';

import * as Facebook from 'expo-facebook';
import _user from '../api/user';
import _db from '../api/db';

import Header from './fields/header';
import user from '../api/user';

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_progressing: false,
      image: '',
      facebookApiId: '2487863998124701', //2487863998124701
      facebookInfoUrl:
        `https://graph.facebook.com/me?fields=name,gender,location,picture,email&access_token=`
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      // gesturesEnabled: false,
      header: Header(navigation, '#f7a40d', 'Sign In')

    }
  }

  async done(result) {
    console.log(result);

    await _db.saveToken('user', result.token);
    this.progressing(false);

    this.props.dispatch({ type: 'change-token', value: result.token });
    this.props.dispatch({ type: 'change-userinfo', value: result, });
    this.props.navigation.navigate('Home', { result })
  }

  async fbLogin() {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(this.state.facebookApiId, { permissions: ['public_profile'], });
      if (type !== 'success') return;

      fetch(this.state.facebookInfoUrl + token)
        .then(response => response.json())
        .then(json => {
          let info = {
            email: json.email,
            name: json.name,
            id: json.id + '_fb',
            image: `https://graph.facebook.com/${json.id}/picture?type=large`
          }

          this.progressing(true);
          _user.fbLogin(info, token, async (result, error) => {
            if (error) return console.log(error);
            if (result.phone) {
              console.log(result);

              await this.done(result);
            } else {
              this.progressing(false);
              this.props.navigation.navigate('Phone', {
                background: '#f7a40d',
                info: result,
                callback: phone => {
                  result.phone = phone;
                  user.donePhone(result.id, phone, (phone, error) => {
                    console.log(phone, error);
                    this.done(result);
                  })
                }
              });
            }
          })
        }).catch(error => error);
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  async login() {
    this.props.navigation.navigate('Home', { result: {} })
    // this.progressing(true);
    // _user.authenticated(this.state.username, this.state.password,
    //   async (result, error) => {
    //     this.progressing(false);
    //     error ? console.log('error') : await this.done(result)
    //   })
  }

  progressing(value) {
    this.props.dispatch({ type: 'change-progressing', value });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <TextInput
            placeholder='username'
            onChangeText={text => this.setState({ username: text })}
            defaultValue='thinh'
            style={{
              ...StyleSheet.flatten(styles.textField),
              backgroundColor: '#b9b9b97a',
            }}
          />

          <TextInput
            placeholder='password'
            secureTextEntry={true}
            onChangeText={text => this.setState({ password: text })}
            defaultValue='`1'
            style={{
              ...StyleSheet.flatten(styles.textField),
              backgroundColor: '#b9b9b97a',
            }}
          />

          <Text style={styles.orTextField}> or </Text>
          <TouchableHighlight
            onPress={this.fbLogin.bind(this)}
            underlayColor='transparent'
            style={styles.facebookContainer}>
            <View style={{ flexDirection: 'row' }}>
              <EIcon name='sc-facebook' color='#fff' size={25} />
              <Text style={styles.fbLoginText}>
                Tiếp tục bằng facebook
              </Text>
            </View>
          </TouchableHighlight>
          <View style={{
            position: 'absolute',
            right: 0, left: 0,
            paddingBottom: 25,
            flexDirection: 'row',
            bottom: 0,
            paddingRight: 25, paddingLeft: 25,
          }}>
            <View style={{ flex: 1, }}></View>
            <View style={{ flex: 1, alignItems: 'flex-end', }}>
              <TouchableHighlight
                onPress={this.login.bind(this)}
                underlayColor='transparent'
                style={{
                  position: 'relative',
                  backgroundColor: '#f7a40d',
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  flexDirection: 'row', alignItems: 'center'
                }}>
                <Text style={{ width: '100%', textAlign: 'center' }}>
                  <Icon name='arrowright' size={30} color='black' />
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default connect()(SignInScreen);