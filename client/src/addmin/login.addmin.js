import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Alert,
} from 'react-native';

import styles from '../login/fields/styles';
import API from './api.addmin';
import DB from '../api/db';
import ErrorMess from '../../api/error_messagers_release';
import * as quater from '../api/headquater';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }
  static navigationOptions = {
    header: null,
    gestureEnabled: false,
  }

  progressing = value => this.props.dispatch({ type: 'change-progressing', value });

  async login() {
    this.progressing(true);
    const info = quater.adminAuthenticated(this.state.username);
    await DB.saveToken('addmin', info.username);
    this.progressing(false);
    this.props.dispatch({ type: 'change-addmin-info', value: info });
    this.props.navigation.navigate('AddminHome');
    // API.authenticated('BigC', this.state.username, this.state.password, async (result, error) => {
    //   this.progressing(false);
    //   if (error) return Alert.alert('Error !', ErrorMess.sigin(error));
    // })
  }

  render() {
    return (
      <View style={{
        paddingTop: 60,
        paddingRight: 25,
        paddingLeft: 25,
      }}>

        <TextInput
          placeholder='username'
          onChangeText={text => this.setState({ username: text })}
          disabled={true}
          value="admin"
          style={{
            ...StyleSheet.flatten(styles.textField),
            backgroundColor: '#b9b9b97a',
          }}
        />

        <TextInput
          placeholder='password'
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value="admin"
          disabled={true}
          style={{
            ...StyleSheet.flatten(styles.textField),
            backgroundColor: '#b9b9b97a',
          }}
        />

        <TouchableHighlight
          onPress={this.login.bind(this)}
          underlayColor='transparent'
          style={styles.facebookContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.fbLoginText}>
              Login
              </Text>
          </View>
        </TouchableHighlight>

      </View>
    )
  }
}

export default connect(state => {
  return {

  }
})(LoginScreen);