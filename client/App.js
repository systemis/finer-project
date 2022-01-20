import React from 'react';
import {
  Text, View,
} from 'react-native';

import { Provider, connect } from 'react-redux';
import * as Permissions from 'expo-permissions';
import store from './redux/index';
import ProgressingContent from './Progressing';
// import { Content } from './MainNavigator';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OTPScreen from './src/login/fields/otp.screen';
import PhoneScreen from './src/login/fields/phone.screen';
import LoginScreen from './src/login/login.screen';
import SignUp from './src/login/signup.screen';
import SignIn from './src/login/signin.screen';
import AdSignIn from './src/login/adsignin.screen';
import SplashScreen from './src/splash.screen';
import Scanner from './src/home/main/scanner';
import QrcodeScreen from './src/qrcode.screen';
import HistoryScreen from './src/history/history';
import BillInfoScreen from './src/Bill/billinfo.screen';
import PaymentScreen from './src/payment/payment';
import CreditScreen from './src/payment/credit.screen';
import ProfileEditScreen from './src/home/profile.edit';

import AddminLoginScreen from './src/addmin/login.addmin';
import AddminHomeScreen from './src/addmin/home.addmin';
import CheckBill from './src/addmin/bill.addmin'
import HomeScreen from './src/home/home';

const Stack = createNativeStackNavigator();

const App = connect(state => {
  return { progressing: state.progressing, }
})(class App extends React.Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      hasCameraPermission: null,
      scanned: false,
    };
  }

  async componentDidMount() {
    await this.getPermissionsAsync();
  }


  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) return <Text>Requesting for camera permission</Text>;
    if (hasCameraPermission === false) return <Text>No access to camera</Text>;
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Credit" component={CreditScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="AddminHome" component={AddminHomeScreen} />
          <Stack.Screen name="AddminLogin" component={AddminLoginScreen} />
          <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
          <Stack.Screen name="Billament" component={QrcodeScreen} />
          <Stack.Screen name="BillInfo" component={BillInfoScreen} />
          <Stack.Screen name="Scanner" component={Scanner} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="OTP" component={OTPScreen} />
          <Stack.Screen name="Phone" component={PhoneScreen} />
          <Stack.Screen name="AdSignIn" component={AdSignIn} />
          <Stack.Screen name="CheckBill" component={CheckBill} />
        </Stack.Navigator>
      </NavigationContainer>
    );
    // return (
    //   <View
    //     style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', }}>
    //     {this.props.progressing && <ProgressingContent />}
    //   </View>
    // );
  }
})

const Index = () => (
  <Provider
    store={store}>
    <App />
  </Provider>
)

export default Index;
