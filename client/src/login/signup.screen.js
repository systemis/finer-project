import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/AntDesign';

import _user from '../api/user';
import _db from '../api/db';

import styles from './fields/styles';
import Header from './fields/header';

import user from '../api/user';

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_progressing: false,
      image: '',
      facebookApiId: '2487863998124701',
      facebookInfoUrl:
        `https://graph.facebook.com/me?fields=name,gender,location,picture,email&access_token=`,
      info: {
        name: '',
        username: '',
        email: '',
        phone: '',
        password: '',
      }
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      // gesturesEnabled: false,

      header: Header(navigation, navigation.getParam('background', '#371442c4'), 'Sign Up')
    }
  }

  progressing = value => this.props.dispatch({ type: 'change-progressing', value });

  async done(result) {
    await _db.saveToken('user', result.token);
    this.progressing(false);

    this.props.dispatch({ type: 'change-token', value: result.token });
    this.props.dispatch({ type: 'change-userinfo', value: result, });
    this.props.navigation.navigate('Home', { result })
  }

  async register() {
    if (!this.state.info.name || !this.state.info.username || !this.state.info.password || !this.state.info.email) return false;
    this.progressing(true);
    _user.register(this.state.info, (result, error) => {
      this.progressing(false);
      if (error) {
        return console.log('Error')
      }

      _db.saveToken('user', result.token);
      this.props.dispatch({ type: 'change-userinfo', value: result });
      this.props.navigation.navigate('Phone', {
        background: '#371442c4',
        info: result,
        callback: phone => {
          result.phone = phone;
          user.donePhone(result.id, phone, (phone, error) => {
            console.log(phone, error);
            this.done(result);
          })
        }
      });
    })
  }

  render() {
    return (
      <View style={{ ...StyleSheet.flatten(styles.container), backgroundColor: this.props.route.params.background | '#371442c4' }}>
        <View style={styles.main}>
          <TextInput
            placeholder='Full name'
            onChangeText={text => this.setState({ info: { ...this.state.info, name: text } })}
            style={{
              ...StyleSheet.flatten(styles.textField),
              backgroundColor: '#b9b9b97a',
            }}
          />

          <TextInput
            placeholder='Enter your email'
            onChangeText={text => this.setState({ info: { ...this.state.info, email: text } })}
            style={{
              ...StyleSheet.flatten(styles.textField),
              backgroundColor: '#b9b9b97a',
            }}
          />

          <TextInput
            placeholder='username'
            onChangeText={text => this.setState({ info: { ...this.state.info, username: text } })}
            style={{
              ...StyleSheet.flatten(styles.textField),
              backgroundColor: '#b9b9b97a',
            }}
          />

          <TextInput
            placeholder='password'
            secureTextEntry={true}
            onChangeText={text => this.setState({ info: { ...this.state.info, password: text } })}
            style={{
              ...StyleSheet.flatten(styles.textField),
              backgroundColor: '#b9b9b97a',

            }}
          />

          <View style={{
            position: 'absolute',
            bottom: 0,
            paddingBottom: 25,
            flexDirection: 'row',
            right: 0,
            left: 0,
            paddingRight: 25,
          }}>
            <View style={{ width: '50%' }}></View>
            <View style={{ width: '50%', alignItems: 'flex-end', }}>
              <TouchableHighlight
                onPress={this.register.bind(this)}
                underlayColor='transparent'
                style={{
                  position: 'relative',
                  backgroundColor: '#371442c4',
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  flexDirection: 'row', alignItems: 'center'
                }}>
                <Text style={{ width: '100%', textAlign: 'center' }}>
                  <Icon name='arrowright' size={30} color='white' />
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default connect()(SignUpScreen);