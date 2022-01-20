import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import IconI from 'react-native-vector-icons/Ionicons';
import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
} from 'react-native'

import QRCode from 'react-native-qrcode-svg';
import Barcode from 'react-native-barcode-builder';

import { FormatPrice } from './api/format';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  headerLeftButton: { width: 30, },
  headerContainer: {
    width: '100%',
    paddingTop: 60,
    paddingLeft: 25,
    backgroundColor: '#fff'
  },

  container: {
    paddingBottom: 50,
    paddingTop: 30,
    flexDirection: 'row',
    height: '100%',
    width: '100%',
  },

  content: {
    width: '100%',
    alignItems: 'center',
  },

  codeText: { letterSpacing: 1, fontSize: 14, },
  bottomContainer: {
    width: '100%',
    marginTop: 120,
    flexDirection: 'row',
    paddingRight: 25,
    paddingLeft: 25
  },

  bottomText: { flex: 1, fontSize: 18, },
})

class QrcodeScreen extends React.Component {
  static state = {
    info: { checked: false },
  }

  static navigationOptions = ({ navigation }) => {
    return {
      gesturesEnabled: false,
      header: (
        <View style={styles.headerContainer}>
          <TouchableHighlight
            style={styles.headerLeftButton}
            underlayColor='transparent'
            onPress={() => navigation.navigate('Home')}>
            <Icon name='left' color='#000' size={30} />
          </TouchableHighlight>
        </View>
      ),
    }
  }

  componentWillMount() {
    var result = this.props.route.params.bill;
    var History = this.props.userInfo.History;

    console.log('result', result);
    console.log('history', History);
    History = History ? [...History, result.billament] : [result.billament];
    this.setState({ info: { ...result.billament, key: result.billament.key.toString() } });
    this.props.dispatch({ type: 'change-userinfo', value: { ...result.user, History } });
  }

  componentDidMount() {
    this.props.Socket.onDoneCheckBill(this.state.info.key, data => {
      console.log('done check ');
      this.setState({ info: { ...this.state.info, checked: true } });
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.codeText}>{this.state.info.key}</Text>
          {/* <Barcode value={this.state.info.key} format="CODE128" /> */}
          <QRCode
            // value={"jdsakldjklsajdlj"}
            value={this.state.info.key.toString()}
            logoSize={200}
            logoBackgroundColor='transparent'
            size={200} />

          <View style={styles.bottomContainer}>
            <Text style={styles.bottomText}>Tổng tiền </Text>
            <Text style={{ ...styles.bottomText, textAlign: 'right', color: 'red' }}>
              {FormatPrice(this.state.info.total)}
            </Text>
          </View>
          <View style={{ ...styles.bottomContainer, marginTop: 10, }}>
            <Text style={{ fontSize: 18 }}> Đã kiểm tra </Text>
            <Text style={{ alignSelf: 'center' }}>
              <IconI
                color={this.state.info.checked ? 'green' : '#000'}
                size={16} name={this.state.info.checked ? 'ios-radio-button-on' : 'ios-radio-button-off'} />
            </Text>
          </View>
        </View>
      </View >
    )
  }
}

export default connect(state => {
  return {
    userInfo: state.info,
    Socket: state.Socket,
  }
})(QrcodeScreen);