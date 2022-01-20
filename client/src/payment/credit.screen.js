import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import { CreditCardInput } from "react-native-credit-card-input";
import Styles from '../login/fields/styles';
import Header from '../login/fields/header';
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
  },

  cardTypeIconText: {
    alignSelf: 'center', fontSize: 14, letterSpacing: 1,
  },

})
class CreditScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      useLiteCreditCardInput: false,
      value: '',
      fullName: '',

      paymentInfo: {
        name: 'Pham Van thinh ',
        number: '2738739827498',
        type: 'jcb',
        expiry: '02/22',
        cvc: '988',
      }
    }
  }

  progressing = value => this.props.dispatch({ type: 'change-progressing', value });
  static navigationOptions = { header: null }

  // _onChange = (formData) => console.log(formData);
  _onChange = formData => this.setState({ paymentInfo: { ...formData.values } });
  _onFocus = (field) => console.log("focusing", field);
  _setUseLiteCreditCardInput = (useLiteCreditCardInput) => this.setState({ useLiteCreditCardInput });

  isValid() {
    const { paymentInfo } = this.state;
    delete paymentInfo['postalCode'];
    var result = true;
    Object.keys(paymentInfo).map(key => paymentInfo[key] == 'uderfine' || !paymentInfo[key] ? result = false : '')
    return result;
  }

  update() {
    let { goBack } = this.props.navigation;
    this.props.route.params.editPayment('credit', this.state.paymentInfo)
      .catch(error => { Alert.alert(`Error ${error}`, 'Please try again !'); goBack() })
      .then(result => {
        goBack();
        this.props.dispatch({
          type: 'change-userinfo', value: {
            ...this.props.info,
            paymentInfo: result.paymentInfo,
            paymentType: result.paymentType,
          }
        })
      })
  }

  render() {
    return (
      <View style={Styles.container}>
        {Header(this.props.navigation, '#f7a40d', 'Credit Info', 150)}
        <View style={Styles.main}>
          <CreditCardInput
            autoFocus

            requiresName
            requiresCVC
            requiresPostalCode

            cardScale={1.0}
            labelStyle={styles.label}
            inputStyle={styles.input}
            validColor={"black"}
            invalidColor={"red"}
            placeholderColor={"darkgray"}

            onFocus={this._onFocus}
            onChange={this._onChange} />

          <TouchableHighlight
            onPress={() => this.isValid() && this.update()}
            style={styles.editPaymentbutton}>
            <Text style={styles.editPaymenttext}>Done </Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

export default connect(state => { return { token: state.token, info: state.info } })(CreditScreen);