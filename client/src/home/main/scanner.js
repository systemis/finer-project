import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import EIcon from 'react-native-vector-icons/EvilIcons';
import FIcon from 'react-native-vector-icons/Feather';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Product from '../../api/product';
import { FormatPrice } from '../../api/format';
import ProductItem from '../../product.item';
import errosMess from '../../../api/errors_messagers';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableHighlight,
  Animated,
  ScrollView,
  Dimensions,
} from 'react-native';

const SCALE = {
  styles(animated, startSize = 1, endSize = 0.99) {
    const interpolation = animated.interpolate({
      inputRange: [0, 1],
      outputRange: [startSize, endSize],
    });

    return {
      transform: [
        { scale: interpolation },
      ],
    };
  },

  pressInAnimation(animated, duration = 150) {
    animated.setValue(0);
    Animated.timing(animated, {
      toValue: 8,
      duration,
      useNativeDriver: true,
    }).start();
  },
  // This defines animatiom behavior we expect onPressOut
  pressOutAnimation(animated, duration = 150) {
    animated.setValue(1);
    Animated.timing(animated, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start();
  },

  slideUpAnimation(animated, toValue = 0, duration = 300) {

    Animated.timing(animated, {
      toValue,
      duration,
      // useNativeDriver: true,
    }).start(() => {
      animated.setValue(toValue);
    });
  }
}

class Header extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', position: 'relative' }}>
          <TouchableHighlight
            underlayColor='transparent'
            onPress={() => this.props.navigation.goBack()}>
            <Icon name='arrowleft' color='#000' size={20} />
          </TouchableHighlight>
          <Text style={styles.headerText}>Cart</Text>
        </View>
      </View>
    )
  }
}

class Scanner extends React.Component {
  state = {
    error_not_enough_pices: 'Bạn không đủ số pices xong tài khoảng, vui lòng đến quầy của siêu thị để nhập ',
    showScanner: false,
    scanned: false,
    storeName: '', storeKey: '',
    total: 0,
    barcodes: [],
    products: [

    ],
    info: {},
    barCodeTypes: [
      // "org.iso.QRCode",
      "org.gs1.EAN-13", // barcode 
      "com.intermec.Code93",
      "org.gs1.EAN-8",
      "org.iso.Aztec",
      "org.ansi.Interleaved2of5",
      "org.iso.Code39",
      "org.iso.DataMatrix",
      "org.iso.Code39Mod43",
      "org.iso.PDF417",
      "org.iso.Code128",
      "org.gs1.UPC-E",
      "org.gs1.ITF14",
    ],
  }

  static navigationOptions = { header: null, }
  deviceHeight = Dimensions.get('screen').height;
  scaleInAnimated = new Animated.Value(0);
  scaleOutAnimated = new Animated.Value(0);
  scannerTop = new Animated.Value(this.deviceHeight);

  progressing = value => this.props.dispatch({ type: 'change-progressing', value });
  scanExit = () => {
    SCALE.slideUpAnimation(this.scannerTop, this.deviceHeight);
    this.setState({ showScanner: false, scanned: true })
  }
  scanPress = () => {
    SCALE.pressOutAnimation(this.scaleInAnimated)
    SCALE.slideUpAnimation(this.scannerTop, 0);
    this.setState({ scanned: false, showScanner: true })
  }

  getInfo(barcode) {
    this.progressing(true);
    Product.findProductByBarcode(this.state.storeName, barcode, (result, error) => {
      this.progressing(false);
      if (error) {
        Alert.alert('Error: ', error);
      } else {
        result.count = 1;
        this.setState({ products: [...this.state.products, result], barcodes: [...this.state.barcodes, barcode] });
      }
    })
  }

  delete(index) {
    var products = this.state.products;
    var barcodes = this.state.barcodes;
    let price = products[index].price * products[index].count;
    products.splice(index, 1);
    barcodes.splice(index, 1);
    this.setState({ products, barcodes, total: this.state.total - price });
  }

  payment() {
    this.progressing(true);
    let date = new Date(Date.now());
    let info = {
      total: this.state.total,
      storeName: this.state.storeName,
      products: this.state.products,
      storeKey: this.state.storeKey,
      date: {
        hour: date.getHours(),
        minutes: date.getMinutes(),
        date: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      }
    }

    Product.payment(this.props.token, info, (result, error) => {
      this.progressing(false);
      if (error) {
        return Alert.alert(error == errosMess.NOT_ENOUGH_PICES ? this.state.error_not_enough_pices : error);
      } else {
        this.props.navigation.navigate('Billament', {
          bill: result
        })
      }
    })
  }
  componentWillMount = () => this.setState({
    storeName: this.props.navigation.getParam('storeName', 'BigC'),
    storeKey: this.props.navigation.getParam('storeKey', '-LrK0VqGtLFp6nLhv3Gq')
  })

  componentDidMount() {
    // this.getInfo('9786048962296');
    // this.getInfo('9786047715091');
    // this.getInfo('8936037710655');
    // this.getInfo('0031604042103');
    // this.getInfo('8935235206045');
    // this.getInfo('9786049317316');
    // this.getInfo('03400704');
  }

  handleBarCodeScanned({ type, data }) {
    this.setState({ scanned: true, showScanner: false });
    let index = this.state.barcodes.indexOf(data);
    if (index <= -1) {
      this.getInfo(data);
      console.log(type, data);
    } else {

      var products = this.state.products;
      products[index].count += 1;
      this.setState({ products, total: this.state.total + products[index].price });
    }

    this.scanExit();
  }

  shouldComponentUpdate(props, state) {
    if (state.products.length !== this.state.products.length) {
      var total = 0;
      state.products.map(product => {
        total += product.price * product.count;
      })

      this.setState({ total });
    }

    return true;
  }

  render() {
    const { scanned, showScanner } = this.state;
    return (
      <View style={styles.main}>
        <Animated.View
          style={{
            position: 'absolute',
            width: '100%', height: '100%', ...SCALE.styles(this.scaleInAnimated),
            paddingTop: 55,
          }}>
          <View style={styles.container}>
            <Header navigation={this.props.navigation} />
            <View style={styles.scanButtonContainer}>
              <TouchableHighlight underlayColor='transparent' style={styles.scanButton}
                onPressOut={() => this.scanPress()}
                onPressIn={() => {
                  SCALE.pressInAnimation(this.scaleInAnimated);
                }}>
                <EIcon name='camera' color='#000' size={25} />
              </TouchableHighlight>
              <ScrollView style={{ width: '100%', height: '70%', }}>
                {this.state.products.map((item, index) => {
                  return (
                    <ProductItem info={item}
                      key={`product-item-${index}`}
                      keyExtractor={() => Math.random() * 100}
                      delete={() => this.delete(index)} />
                  )
                })}
              </ScrollView>
            </View>
            {this.state.products.length ? (
              <View style={styles.bottomContainer}>
                <Text style={{ width: '100%', flexDirection: 'row', paddingLeft: 5 }}>
                  <Text style={{ fontSize: 23, letterSpacing: 1, }}>Total: </Text>
                  <Text style={{ fontSize: 18, letterSpacing: 1 }}>{FormatPrice(this.state.total.toString())}</Text>
                </Text>
                <TouchableHighlight
                  onPress={() => this.payment()}
                  style={styles.checkoutButton}>
                  <Text style={styles.checkoutText}>Thanh toán </Text>
                </TouchableHighlight>
              </View>
            ) : null}
          </View>
        </Animated.View>

        {/* {showScanner && ( */}
        <Animated.View style={{
          position: 'absolute',
          height: Dimensions.get('screen').height, width: '100%',
          top: this.scannerTop,
        }}>
          <View style={{ height: '100%', width: '100%', position: 'relative' }}>
            {console.log(scanned)}
            <View style={{ paddingRight: 30, paddingLeft: 30, paddingTop: 250, paddingBottom: 250, backgroundColor: '#fff' }}>
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned.bind(this)}
                barCodeTypes={this.state.barCodeTypes}
                style={{
                  width: '100%',
                  height: '100%'
                }}
              />
            </View>
            <TouchableHighlight
              style={{ position: 'absolute', top: 60, left: 25 }}
              onPress={this.scanExit.bind(this)}>
              <EIcon name='close' size={35} color='#000' />
            </TouchableHighlight>
          </View>
        </Animated.View>
        {/* )} */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    paddingLeft: 3, paddingRight: 3,
    // backgroundColor: '#000'
  },

  header: {
    backgroundColor: '#ffd944',
    height: 100,
    width: '100%',
    paddingRight: 25,
    paddingLeft: 25,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerText: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
    width: '100%',
    paddingRight: 70,
    fontWeight: '700',
  },

  scanButtonContainer: {
    height: '70%',
    width: '100%',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: "#fff",
    position: 'relative'
  },

  scanButton: { alignSelf: 'center', marginTop: 15, marginBottom: 15, },

  productCountButton: {
    backgroundColor: 'gray',
    borderRadius: 50,
    width: 30,
    height: 30,
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'row',
  },

  productcounttext: {
    paddingTop: 10,
    paddingBottom: 10,
  },

  productItemContainer: { flexDirection: 'row', flex: 1, },
  productShowImage: { flex: 1, },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },

  productShowName: { flex: 2, },
  productName: {},
  productPrice: {},

  productControlContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },

  productControlChild: {
    alignItems: 'center',
    width: '100%',
  },

  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    paddingRight: 15, paddingLeft: 15,
    paddingBottom: 20,
  },

  checkoutButton: {
    paddingBottom: 15,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    width: '100%',
    borderRadius: 40,
  },

  checkoutText: {
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    fontSize: 25,
  },
})

export default connect(state => { return { token: state.token } })(Scanner);