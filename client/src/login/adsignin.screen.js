import React from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/AntDesign';
import EIcon from 'react-native-vector-icons/EvilIcons';

import * as Facebook from 'expo-facebook';
import _user from '../api/user';
import _db from '../api/db';

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_progressing: false,
      image: '',
      facebookApiId: '2487863998124701',
      facebookInfoUrl: `https://graph.facebook.com/me?fields=name,gender,location,picture,email&access_token=`
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      // gesturesEnabled: false,
      header: (
        <View style={{
          width: '100%',
          height: 200,
          backgroundColor: '#f7a40d',
          paddingTop: 80,
          paddingLeft: 25,
        }}>
          <TouchableHighlight
            onPress={() => navigation.goBack()}
            underlayColor='transparent'
          ><Icon name='arrowleft' color='black' size={30} /></TouchableHighlight>
          <Text style={{
            color: '#fff',
            fontSize: 30,
            letterSpacing: 3,
          }}>
            Sign In
          </Text>
        </View>
      )
    }
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
            style={{ ...StyleSheet.flatten(styles.textField), backgroundColor: '#b9b9b97a', }}
          />

          <TextInput
            placeholder='password'
            secureTextEntry={true}
            style={{
              ...StyleSheet.flatten(styles.textField),
              backgroundColor: '#b9b9b97a',
              marginTop: 30,
            }}
          />
          <View style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            paddingBottom: 25,
            flexDirection: 'row',
          }}>
            <View style={{ width: '50%' }}></View>
            <View style={{ width: '50%', alignItems: 'flex-end', }}>
              <TouchableHighlight style={{
                position: 'relative',
                backgroundColor: '#f7a40d',
                padding: 10,
                borderRadius: '100%',
              }}>
                <Icon name='arrowright' size={30} color='black' />
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7a40d',
    height: '100%',
    width: '100%',
    position: 'relative',
  },

  main: {
    height: '100%',
    width: '100%',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: 'white',

    paddingTop: 30,
    paddingRight: 25,
    paddingLeft: 25,
  },

  textField: {
    width: '100%',

    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 25,
  },

  orTextField: {
    marginTop: 30,
    marginBottom: 30,
    width: '100%',
    textAlign: 'center',
    fontSize: 14,
  },

  facebookContainer: {
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 15,
    paddingTop: 15,
    backgroundColor: '#4274a7',
    borderRadius: 25,
  },

  fbLoginText: {
    marginLeft: 15,
    color: '#fff',
  }
})

export default connect()(SignInScreen);