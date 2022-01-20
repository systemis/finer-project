import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import Header from './header';
import styles from './styles';

import Icon from 'react-native-vector-icons/Feather';
import user from '../../api/user';

const Button = props => (
  <TouchableHighlight
    underlayColor='transparent'
    onPress={props.onPress}
    style={{
      backgroundColor: '#b9b9b97a',
      width: 70,
      height: 70,
      borderRadius: 70 / 2,
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: props.right ? props.right : 0,
      marginLeft: props.left ? props.left : 0,
    }}>
    <Text style={{
      color: 'gray',
      width: '100%',
      textAlign: 'center',
    }}>{props.title}</Text>

  </TouchableHighlight>
)

class OTPScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      background: '#000',
      otp: 0,
      phone: '0905631878',
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: Header(navigation, navigation.getParam('background', '#000'), 'Typeing your phone')
    }
  }

  progressing = value => this.props.dispatch({ type: 'change-progressing', value });

  sendOTP() {
    this.progressing(true);
    user.sendOTP(this.state.phone, (code, error) => {
      this.progressing(false);
      this.props.navigation.navigate('OTP', {
        info: this.props.route.params.info,
        callback: this.props.route.params.callback,
        phone: this.state.phone,
        background: this.state.background,
        code,
      })
    })
  }

  componentDidMount() {
    this.setState({ background: this.props.route.background || '#000' });
  }

  add(number) {
    this.setState({ phone: this.state.phone + number.toString() });
  }

  render() {
    return (
      <View style={{ ...StyleSheet.flatten(styles.container), backgroundColor: this.state.background }}>
        <View style={styles.main}>
          <TextInput
            placeholder='Enter Your Phone'
            editable={false}
            value={this.state.phone}
            style={{
              ...StyleSheet.flatten(styles.textField),
              backgroundColor: '#b9b9b97a',
            }}
          />
          <View style={{
            marginTop: 30,
            alignItems: 'center'
          }}>
            <View style={{ flexDirection: 'row' }}>
              <Button title={'1'} onPress={() => this.add(1)} />
              <Button title={'2'} onPress={() => this.add(2)} right={20} left={20} />
              <Button title={'3'} onPress={() => this.add(3)} />
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 20 }}>
              <Button title={'4'} onPress={() => this.add(4)} />
              <Button title={'5'} onPress={() => this.add(5)} right={20} left={20} />
              <Button title={'6'} onPress={() => this.add(6)} />
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 20 }}>
              <Button title={'7'} onPress={() => this.add(7)} />
              <Button title={'8'} onPress={() => this.add(8)} right={20} left={20} />
              <Button title={'9'} onPress={() => this.add(9)} />
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 20 }}>
              <View style={{ width: 70, height: 70, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableHighlight
                  underlayColor='transparent'
                  style={{ width: '100%', }}
                  onPress={this.sendOTP.bind(this)}>
                  <Text style={{ width: '100%', textAlign: 'center' }}>Enter</Text>
                </TouchableHighlight>
              </View>

              <Button title={'0'} onPress={() => this.add(0)} right={20} left={20} />

              <TouchableHighlight
                onPress={() => this.setState({ phone: this.state.phone.slice(0, -1) })}
                underlayColor='transparent'
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 70 / 2,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 15,
                }}>
                <Icon name='delete' color='#000' size={30} />
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default connect(state => { return {} })(OTPScreen)