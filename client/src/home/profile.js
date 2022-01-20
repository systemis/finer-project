import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';


import Icon from 'react-native-vector-icons/Entypo';
import IconA from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconF from 'react-native-vector-icons/Feather';
import IconAn from 'react-native-vector-icons/AntDesign';

import DB from '../api/db';
import { FormatPrice } from '../api/format';

class Profile extends React.Component {
  static navigationOptions = {
    header: null
  }


  async logout() {
    await DB.saveToken('', '');
    this.props.dispatch({ type: 'change-usefinfo', value: {} });
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header} />
        <View style={styles.main}>
          <View style={styles.mainContainer}>
            <View style={styles.contentItem}>
              <TouchableHighlight
                underlayColor='transparent'
                onPress={() => this.props.navigation.navigate('ProfileEdit')}
                style={{ position: 'absolute', right: 12, top: 12, }}>
                <Icon name='dots-three-vertical' color='#000' size={18} />
              </TouchableHighlight>
              <Image source={{ uri: this.props.info.image }} style={styles.avatarImage} />

              <View style={{ paddingTop: 15, width: '100%' }}>
                <Text style={styles.userName}>{this.props.info.name}</Text>
              </View>

              <View style={{ flexDirection: 'row', alignSelf: 'center', paddingBottom: 5, }}>
                <View><IconA name='phone' size={20} color={'black'} /></View>
                <View style={{ alignSelf: 'center', paddingLeft: 12, }}>
                  <Text style={{ fontSize: 12, }}>
                    {this.props.info.phone}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <View><IconM name='email-outline' size={20} color={'black'} /></View>
                <View style={{ alignSelf: 'center', paddingLeft: 12, }}>
                  <Text style={{ fontSize: 12, }}>
                    {this.props.info.email}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ ...styles.contentItem, flexDirection: 'row', marginTop: 20, }}>
              <View style={{ flex: 1, alignItems: 'center', }}>
                <Text>{FormatPrice(this.props.info.pices)}</Text>
                <Text>Pices</Text>
              </View>
              <View style={{
                flex: 1,
                borderLeftColor: '#5f5f5f8c',
                borderLeftWidth: 0.25,
                alignItems: 'center',
              }}>
                <Text>{this.props.info.History.length}</Text>
                <Text>Đơn hàng</Text>
              </View>
            </View>
            <View style={{
              ...styles.contentItem,
              marginTop: 20,
              paddingTop: 15,
              paddingBottom: 15,
            }}>
              <View style={{ flexDirection: 'row', paddingTop: 20, paddingBottom: 10, }}>
                <View style={{ flex: 1 }}><IconF name='shopping-bag' color={'#000'} size={25} /></View>
                <View style={{ flex: 7, paddingLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableHighlight
                    style={{ width: '100%' }}
                    underlayColor='transparent'
                    onPress={() => this.props.navigation.navigate('History')}>
                    <Text>Lịch sử giao dịch </Text>
                  </TouchableHighlight>
                </View>
              </View>
              <View style={{ flexDirection: 'row', paddingTop: 20, paddingBottom: 10, }}>
                <View style={{ flex: 1 }}><IconF name='credit-card' color={'#000'} size={25} /></View>
                <View style={{ flex: 7, paddingLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableHighlight
                    style={{ width: '100%' }}
                    underlayColor='transparent'
                    onPress={() => this.props.navigation.navigate('Payment')}>
                    <Text>Phương thức thanh toán </Text>
                  </TouchableHighlight>
                </View>
              </View>
              <View style={{ flexDirection: 'row', paddingTop: 20, paddingBottom: 10, }}>
                <View style={{ flex: 1 }}><IconAn name='poweroff' color={'red'} size={25} /></View>
                <View style={{ flex: 7, paddingLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableHighlight
                    underlayColor='transparent'
                    onPress={this.logout.bind(this)}
                    style={{ width: '100%' }}>
                    <Text style={{ color: 'red' }}>Đăng xuất </Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: '#f7f7f7c9'
  },

  header: {
    position: 'relative',
    top: -80,
    height: 300,
    width: '100%',
    borderRadius: 80,
    backgroundColor: '#ffc800',
  },

  main: {
    position: 'relative',
    width: '100%',
    height: '100%',
    paddingRight: 40,
    paddingLeft: 40,
  },

  mainContainer: {
    position: 'relative',
    top: -200,
    width: '100%',
    height: 400,
  },

  contentItem: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingTop: 25,
    paddingBottom: 25,
    paddingRight: 15,
    paddingLeft: 15,
  },

  avatarImage: {
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
    resizeMode: 'contain',
    alignSelf: 'center'
  },

  userName: {
    fontSize: 25,
    letterSpacing: 1,
    color: '#0d265f',
    width: '100%',
    textAlign: 'center',
    fontWeight: '600',
    paddingBottom: 5,
  },
})

export default connect(state => {
  return { info: state.info, navigation: state.navigation }
})(Profile);