import React, { useState, useEffect } from 'react';
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

const QrcodeScreenS = (props) => {
  const [info, setInfo] = useState({ checked: false });

  useEffect(() => {
    const bill = props.navigation.getParam('bill');
    setInfo({ ...info, ...bill });
  }, [])
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.codeText}>{info.id}</Text>
        <Barcode value={info.id} format="CODE128" />
        <QRCode
          // value={"jdsakldjklsajdlj"}
          value={info.id}
          logoSize={200}
          logoBackgroundColor='transparent'
          size={200} />

        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>Tổng tiền </Text>
          <Text style={{ ...styles.bottomText, textAlign: 'right', color: 'red' }}>
            {FormatPrice(info.total)}
          </Text>
        </View>
        <View style={{ ...styles.bottomContainer, marginTop: 10, }}>
          <Text style={{ fontSize: 18 }}> Đã kiểm tra </Text>
          <Text style={{ alignSelf: 'center' }}>
            <IconI
              color={info.checked ? 'green' : '#000'}
              size={16} name={info.checked ? 'ios-radio-button-on' : 'ios-radio-button-off'} />
          </Text>
        </View>
      </View>
    </View >
  )
};

QrcodeScreenS.navigationOptions = ({ navigation }) => ({
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
});

export default connect(state => {
  return {
    userInfo: state.info,
    // Socket: state.Socket,
  }
})(QrcodeScreenS);

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