import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import Camera from 'react-native-camera';

import Icon from 'react-native-vector-icons/AntDesign';


import { BarCodeScanner } from 'expo-barcode-scanner';
import db from '../api/db';
import apiAddmin from './api.addmin';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scanned: false,
      code: '8965107',
      barCodeTypes: [
        "org.iso.QRCode",
      ],
    }
  }

  progressing = value => this.props.dispatch({ type: 'change-progressing', value });

  async logout() {
    await db.saveToken('', '');
    this.props.navigation.navigate('Login');
  }

  static navigationOptions = ({ navigation }) => {
    return {
      gesturesEnabled: false,
      header: null
    }
  }


  handleBarCodeScanned({ data }) {
    this.setState({ scanned: true, code: data });
  }

  getReckoning() {
    this.progressing(true);
    apiAddmin.getReckoning(this.props.token, this.props.addminInfo.storeKey, this.state.code, (result, error) => {
      this.progressing(false);
      if (error) return;

      this.props.navigation.navigate('CheckBill', { info: { ...result, code: this.state.code } });
    })
  }

  componentDidMount() {
    //this.getReckoning();
  }

  render() {
    let { scanned } = this.state;
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <View style={{
          paddingTop: 70,
          paddingBottom: 20,
          backgroundColor: '#fff',
          flexDirection: 'row',
          paddingLeft: 25,
          paddingRight: 25,
        }}>
          <TouchableHighlight
            underlayColor='transparent'
            onPress={async () => await this.logout()}>
            <Icon name='left' color='#000' size={30} />
          </TouchableHighlight>
          <Text style={{
            fontSize: 25,
            letterSpacing: 2,
            width: '100%',
            textAlign: 'center',
          }}>Checking Bills</Text>
        </View>
        <View style={{ width: '100%', height: '100%', position: 'relative' }}>
          <View style={{
            width: '100%',
            height: '70%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <View style={{
              width: '100%',
              position: 'relative',
              alignItems: 'center',
            }}>
              <View style={{ width: 250, height: 250, borderRadius: 100, }}>
                <BarCodeScanner
                  // barCodeTypes={this.state.barCodeTypes}
                  onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned.bind(this)}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 100,
                    position: 'absolute',
                    backgroundColor: 'yellow',
                    alignItems: 'flex-end',
                  }}
                />
              </View>
              {scanned && (
                <TouchableHighlight
                  underlayColor='transparent'
                  onPress={this.getReckoning.bind(this)}
                  style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    width: 200,
                    backgroundColor: '#000',
                    marginTop: 20,
                  }}>
                  <Text style={{
                    fontSize: 18,
                    letterSpacing: 2,
                    color: '#fff',
                    width: '100%',
                    textAlign: 'center',
                  }}>Next {this.state.code}</Text>
                </TouchableHighlight>
              )}
            </View>
          </View>
        </View>
        <View style={{
          position: 'absolute',
          bottom: 0,
          paddingBottom: 30,
          alignItems: 'flex-end',
          width: '100%',
          paddingRight: 25,
          paddingLeft: 25,
          flexDirection: 'row',
        }}>
          <View style={{ flex: 1 }}>
            <TouchableHighlight
              onPress={() => { this.setState({ scanned: false }) }}
              style={{
                flexDirection: 'row', alignItems: 'center',
                paddingTop: 10, paddingBottom: 10, backgroundColor: '#000', width: 100,
              }}>
              <Text style={{ color: '#fff', width: '100%', textAlign: 'center' }}>Restart</Text>
            </TouchableHighlight>
          </View>

          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <TouchableHighlight
              onPress={this.logout.bind(this)}
              style={{
                flexDirection: 'row', alignItems: 'center',
                paddingTop: 10, paddingBottom: 10, backgroundColor: '#000', width: 100,
              }}>
              <Text style={{ color: '#fff', width: '100%', textAlign: 'center' }}>Cancel</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
}

export default connect(state => {
  return {
    addminInfo: state.addminInfo,
    token: state.token,
  }
})(HomeScreen);