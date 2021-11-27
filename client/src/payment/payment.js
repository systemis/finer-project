import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image, Alert, } from 'react-native';
import { IconPaymet, } from "react-native-credit-card-input";
import Icons from 'react-native-credit-card-input/src/Icons'
import { connect } from 'react-redux';
import { FormatCard } from '../api/format';
import Icon from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/Feather';
import Header from '../login/fields/header';
import User from '../api/user';
import Styles from '../login/fields/styles';
const styles = StyleSheet.create({
  switch: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    backgroundColor: "#F5F5F5",
    marginTop: 60,
  },
  label: {
    color: "black",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "black",
  },

  editPaymentbutton: {
    width: '100%', marginTop: 15, paddingTop: 15, paddingBottom: 15, backgroundColor: '#000'
  },

  editPaymenttext: {
    width: '100%', textAlign: 'center', color: '#fff', fontSize: 18, letterSpacing: 2
  },

  cardTypeIconImage: {
    width: 60,
    height: 40,
    resizeMode: "contain",
    // backgroundColor: 'yellow'
  },

  cardTypeIconText: {
    alignSelf: 'center',
    fontSize: 16,
    letterSpacing: 1,
  },

})

class ChoiceItem extends React.Component {
  render() {
    let { checked, title, onPress } = this.props;
    return (
      <View style={{ flexDirection: 'row', paddingBottom: 25, }}>
        <Icon
          color={checked ? 'green' : '#000'}
          size={24}
          name={checked ? 'ios-radio-button-on' : 'ios-radio-button-off'} />
        <TouchableHighlight underlayColor='transparent' onPress={onPress}>
          <Text style={{ letterSpacing: 1, fontSize: 18, marginLeft: 20, }}>{title}</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

class PaymentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentType: '8999',
      paymentInfo: {},
    }
  }

  static defaultProps = {
    paymentType: '0900',
    paymentInfo: {
      name: 'Phạm Văn Thinh ',
      number: '355598782136',
      type: 'jcb',
      expiry: '05/22',
      postalCode: '500000',
      cvc: '392',
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  }

  progressing = value => this.props.dispatch({ type: 'change-progressing', value });
  notiError = error => { console.log(error), Alert.alert(`Error ${error}`, 'Please try again !'); }
  onPress(value) {
    this.setState({ paymentType: value });
  }

  updatePayment(result) {
    this.props.dispatch({
      type: 'change-userinfo', value: {
        ...this.props.info,
        paymentInfo: result.paymentInfo,
        paymentType: result.paymentType,
      }
    })
  }


  defaultPaymentChecked() {
    this.onPress('default');
    this.editPayment('default', this.state.paymentInfo)
      .catch(error => this.notiError(error))
      .then(result => this.updatePayment(result));
  }

  creditPaymentChecked() {
    this.onPress('credit');
    if (this.state.paymentInfo !== 'default') {
      this.editPayment('credit', this.state.paymentInfo)
        .catch(error => this.notiError(error))
        .then(result => this.updatePayment(result));
    }
  }

  deleteCreditCard() {
    this.editPayment('default', 'default')
      .catch(error => this.notiError(error))
      .then(result => this.updatePayment(result));
  }

  editPayment(type, paymentInfo) {
    return new Promise((resolve, reject) => {
      this.progressing(true);
      User.editPayment(this.props.token, type, paymentInfo)
        .catch(error => {
          this.progressing(false);
          reject(error);
        })
        .then(result => {
          this.progressing(false);

          this.setState({ paymentInfo: result.paymentInfo, paymentType: result.paymentType });
          resolve(result);
        })
    });
  }

  componentWillMount() {
    this.setState({ paymentType: this.props.paymentType, paymentInfo: this.props.paymentInfo });
  }

  shouldComponentUpdate(nextProps, nextState) { console.log('payment info', nextState.paymentInfo); return true }

  render() {
    let { paymentType, paymentInfo } = this.state;
    return (
      <View style={{ ...StyleSheet.flatten(Styles.container), backgroundColor: '#000' }}>
        {Header(this.props.navigation, '#000', 'Payment Info')}
        <View style={Styles.main}>
          <ChoiceItem
            title={'Thanh toán bằng số pices  '}
            checked={paymentType == 'default' ? true : false}
            onPress={this.defaultPaymentChecked.bind(this)} />
          <ChoiceItem
            title={'Thanh toán bằng thẻ tín dụng '}
            checked={paymentType == 'default' ? false : true}
            onPress={this.creditPaymentChecked.bind(this)} />
          {paymentType == 'credit' && paymentInfo == 'default' ? (
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Credit', { editPayment: this.editPayment.bind(this) })}
              style={styles.editPaymentbutton}>
              <Text style={{ ...StyleSheet.flatten(styles.editPaymenttext), fontSize: 24, }}>+ </Text>
            </TouchableHighlight>
          ) : null}

          {paymentType == 'credit' && paymentInfo.number ? (
            <View style={{ flexDirection: 'row', width: '100%', position: 'relative' }}>
              <Image
                source={Icons[paymentInfo.type]}
                style={styles.cardTypeIconImage} />
              <Text style={styles.cardTypeIconText}>
                {FormatCard(paymentInfo.number)}
              </Text>
              <TouchableHighlight
                onPress={this.deleteCreditCard.bind(this)}
                underlayColor='transparent'
                style={{ marginLeft: 30, alignSelf: 'center', }}>
                <IconF name='trash' color='#000' size={18} />
              </TouchableHighlight>
            </View>
          ) : null}
        </View>
      </View>
    )
  }
}

export default connect(state => {
  return {
    token: state.token,
    info: state.info,
    paymentInfo: state.info.paymentInfo,
    paymentType: state.info.paymentType,
  }
})(PaymentScreen);