import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';


import logo from '../../assets/logo.png';
import Icon from 'react-native-vector-icons/AntDesign';


class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

  }


  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  }

  onPress() {
    console.log(this.state.username, this.state.password);
  }

  async logIn() {

  }

  async componentWillMount() {
  }

  render() {
    return (
      <View style={{
        ...StyleSheet.flatten(styles.container),
        position: 'relative'
      }}>

        <View style={styles.topContainer}>

          <Image
            source={logo}
            style={styles.logoImage}
          />

        </View>
        <View style={styles.main}>
          <View style={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}>
            <View style={{
              marginLeft: 20,
              top: 0,
              right: 20,
            }}>
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => {
                  this.props.navigation.navigate('AddminLogin')
                }}>
                <Icon name='pushpino' size={25} color={'white'} />
              </TouchableHighlight>
            </View>

            <Text style={styles.mainTitle}>Welcome to app </Text>
            <Text style={styles.appIntro}>
              Ứng dụng thanh toán trực tiếp tại gian hàng
              {/* giúp bạn tiết kiệm thời gian lên tới 40% */}
          </Text>
            <View style={styles.buttonContainer}>
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => this.props.navigation.navigate('SignIn', { title: 'sign-in' })}
                style={{
                  ...StyleSheet.flatten(styles.button),
                  backgroundColor: '#cc7831',
                }}>
                <Text style={styles.buttonText}>Đăng nhập </Text>
              </TouchableHighlight>

              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => this.props.navigation.navigate('SignUp', { title: 'sign-up' })}
                style={{
                  ...StyleSheet.flatten(styles.button),
                  backgroundColor: '#cc3171',
                  marginLeft: 20,
                }}>
                <Text style={styles.buttonText}>Đăng kí </Text>
              </TouchableHighlight>
            </View>
          </View>

        </View>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative', height: '100%', width: '100%'
  },

  topContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
    flexDirection: 'column',
    paddingTop: 150,
  },

  logoImage: {
    alignSelf: 'center',
    alignContent: 'center',
    height: 200,
    width: 200,
    // resizeMode: 'contain',
  },

  main: {
    position: 'absolute',
    backgroundColor: '#1c3850',
    width: '100%',
    bottom: 0,
    height: 350,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 15,
    paddingRight: 25,
    paddingLeft: 25,
  },

  mainTitle: {
    color: '#fff',
    fontSize: 40,
    letterSpacing: 5,
    // fontFamily: 'Times New Roman',
    lineHeight: 45,
  },

  appIntro: {
    color: '#fff',
    fontSize: 15,
    letterSpacing: 2,
    marginTop: 20,
    lineHeight: 29,
  },

  buttonContainer: {
    width: '100%',
    marginTop: 30,
    flexDirection: 'row',
  },

  button: {
    paddingTop: 15,
    paddingBottom: 15,
    width: 150,

    borderRadius: 20,
  },

  buttonText: {
    width: '100%',
    textAlign: 'center',
    color: 'white',
    fontSize: 17,
    letterSpacing: 2,
  },

})

export default LoginScreen;