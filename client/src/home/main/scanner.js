import React, { useEffect, useState} from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import EIcon from 'react-native-vector-icons/EvilIcons';
import FIcon from 'react-native-vector-icons/Feather';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Product from '../../api/product';
import { FormatPrice } from '../../api/format';
import ProductItem from '../../product.item';
import errosMess from '../../../api/errors_messagers';
import Helpers from '../../utils/';
import HeaderQuater from '../../api/headquater';
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


const ScannerScreen = (props) => {
  const [showScanner, setShowScanner] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [storeId, setStoreId] = useState('');
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [barcodes, setBarcodes] = useState([]);
  const [info, setInfo] = useState({});
  const barCodeTypes = [
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
  ];
  
  const deviceHeight = Dimensions.get('screen').height;
  const scaleInAnimated = new Animated.Value(0);
  const scaleOutAnimated = new Animated.Value(0);
  const scannerTop = new Animated.Value(deviceHeight);

  const progressing = (value) => {
    props.dispatch({ type: 'change-progressing', value });
  };

  const handleScanExit = () => {
    SCALE.slideUpAnimation(scannerTop, deviceHeight);
    setShowScanner(false);
    setScanned(true);
  }

  const handleScanPress = () => {
    SCALE.pressOutAnimation(scaleInAnimated)
    SCALE.slideUpAnimation(scannerTop, 0);
    setShowScanner(true);
    setScanned(false);
  }

  const getInfo = (barcode) => {
    console.log('barcode', barcode);
  } 

  const handleDelete = (index) => {
    const price = products[index].price * products[index].count; 
    setProducts(products.splice(index, 1));
    setBarcodes(barcodes.splice(index, 1));
    setTotal(total - price);
  }

  const handlePayment = async () => {
    if (!total) {
      return; 
    }
    
    progressing(true);
    let date = new Date(Date.now());
    let info = {
      total, 
      storeName,
      products, 
      storeId, 
      date: {
        hour: date.getHours(),
        minutes: date.getMinutes(),
        date: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      }
    }

    const bill = await Helpers.handlePayment(info); 
    progressing(false);
    // console.log(bill);
    props.navigation.navigate('Billament', { bill });
    // Product.payment(props.token, info, (result, error) => {
    //   progressing(false);
    //   if (error) {
    //     return Alert.alert(error == errosMess.NOT_ENOUGH_PICES ? error_not_enough_pices : error);
    //   } else {
    //     navigation.navigate('Billament', {
    //       bill: result
    //     })
    //   }
    // }) 
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setShowScanner(false);
    let index = barcodes.indexOf(data);
    if (index <= -1) {
      getInfo(data);
      return handleScanExit();
    }

    var products = this.state.products;
    products[index].count += 1;
    setProducts(products);
    setTotal(total + products[index].price);
    handleScanExit(); 
  }

  const handlePlus = (_index) => {
    const updated = products.map((item, index) => {
      if (_index === index) {
        return { ...item, count: item.count + 1 }
      }
      return item; 
    })
    setProducts(updated);
  }

  const handleRemove = (_index) => {
    const updated = products.map((item, index) => {
      if (_index === index) {
        return { ...item, count: item.count > 0 ? item.count - 1 : item.count }
      }
      return item; 
    })
    setProducts(updated);
  }

  useEffect(() => {
    var total = 0; 
    products.forEach(product => total += product.price * product.count);
    setTotal(total);
  }, [products]);

  useEffect(() =>  {
    const storeId = props.navigation.getParam('storeId', '-LrK0VqGtLFp6nLhv3Gq');
    const storeName = props.navigation.getParam('storeName', 'BigC');
    const productList = HeaderQuater.getProductList(storeId)

    // props.storeList.forEach((item) => item.id === storeId && setProducts(item.products))
    setStoreId(storeId);
    setStoreName(storeName); 
    setProducts(productList);
  }, []);

  return (
    <View style={styles.main}>
      <Animated.View
        style={{
          position: 'absolute',
          width: '100%', height: '100%', ...SCALE.styles(scaleInAnimated),
          paddingTop: 55,
        }}>
        <View style={styles.container}>
          <Header navigation={props.navigation} />
          <View style={styles.scanButtonContainer}>
            <TouchableHighlight underlayColor='transparent' style={styles.scanButton}
              onPressOut={() => handleScanPress()}
              onPressIn={() => {
                SCALE.pressInAnimation(scaleInAnimated);
              }}>
              <EIcon name='camera' color='#000' size={25} />
            </TouchableHighlight>
            <ScrollView style={{ width: '100%', height: '70%', }}>
              {products.map((item, index) => {
                return (
                  <ProductItem 
                    key={`product-item-${index}`}
                    info={item}
                    keyExtractor={() => Math.random() * 100}
                    delete={() => handleDelete(index)} 
                    onPlus={() => handlePlus(index)}
                    onDelete={() => handleRemove(index)}/>
                )
              })}
            </ScrollView>
          </View>
          {products.length ? (
            <View style={styles.bottomContainer}>
              <Text style={{ width: '100%', flexDirection: 'row', paddingLeft: 5 }}>
                <Text style={{ fontSize: 23, letterSpacing: 1, }}>Total: </Text>
                <Text style={{ fontSize: 18, letterSpacing: 1 }}>{FormatPrice(total.toString())}</Text>
              </Text>
              <TouchableHighlight
                onPress={() => handlePayment()}
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
        top: scannerTop,
      }}>
        <View style={{ height: '100%', width: '100%', position: 'relative' }}>
          {console.log(scanned)}
          <View style={{ paddingRight: 30, paddingLeft: 30, paddingTop: 250, paddingBottom: 250, backgroundColor: '#fff' }}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              barCodeTypes={barCodeTypes}
              style={{
                width: '100%',
                height: '100%'
              }}
            />
          </View>
          <TouchableHighlight
            style={{ position: 'absolute', top: 60, left: 25 }}
            onPress={handleScanExit}>
            <EIcon name='close' size={35} color='#000' />
          </TouchableHighlight>
        </View>
      </Animated.View>
      {/* )} */}
    </View>
  )
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
    paddingLeft: 20, 
    paddingRight: 20,
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

ScannerScreen['navigationOptions'] = () => ({
  header: null
})

export default connect(state => ({ 
  token: state.token, 
  storeList: state.storesList, 
 }))(ScannerScreen);