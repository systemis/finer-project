import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Alert,
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
      ...StyleSheet.flatten(styles.circleButton),
      marginRight: props.right ? props.right : 0,
      marginLeft: props.left ? props.left : 0,
    }}>
    <Text style={styles.textincircle}>{props.title}</Text>

  </TouchableHighlight>
)

const Cow = props => (
  <View style={{
    width: 30,
    height: 30,
    backgroundColor: 'transparent',
    borderColor: 'black',
    borderWidth: 1,
    marginRight: props.right ? props.right : 0,
    marginLeft: props.left ? props.left : 0,
    flexDirection: 'row',
    alignItems: 'center',
  }}>
    <Text style={styles.textincircle}>{props.title}</Text>
  </View>
)

export default class OTPScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: 0,
      code: '',
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: Header(navigation, navigation.getParam('background', '#000'), 'OTP Acceptment')
    }
  }

  add(number) {
    if (this.state.code.length > 4) return false;
    var code = this.state.code + number.toString();

    // checkout 
    this.setState({ code }); console.log(this.props.navigation.getParam('code'));
    if (code.length == 4) {
      if (code == this.props.navigation.getParam('code')) {
        Alert.alert('Success')
        this.props.navigation.getParam('callback')(this.props.navigation.getParam('phone'));
      } else {
        Alert.alert('Failed');
      }
    }
  }

  render() {
    return (
      <View style={{ ...StyleSheet.flatten(styles.container), backgroundColor: this.props.navigation.getParam('background', '#000') }}>
        <View style={styles.main}>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <Cow title={this.state.code.split('')[0]} right={20} />
            <Cow title={this.state.code.split('')[1]} right={20} />
            <Cow title={this.state.code.split('')[2]} right={20} />
            <Cow title={this.state.code.split('')[3]} />
          </View>
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
              <View style={{ width: 70, height: 70 }} />
              <Button title={'0'} onPress={() => this.add(0)} right={20} left={20} />
              <TouchableHighlight
                onPress={() => this.setState({ code: this.state.code.slice(0, -1) })}
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