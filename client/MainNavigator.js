import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import _DB from './src/api/db';

import OTPScreen from './src/login/fields/otp.screen';
import PhoneScreen from './src/login/fields/phone.screen';
import LoginScreen from './src/login/login.screen';
import SignUp from './src/login/signup.screen';
import SignIn from './src/login/signin.screen';
import AdSignIn from './src/login/adsignin.screen';
import HomeScreen from './src/home/home';
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

const Navigator = createStackNavigator({
  // Scanner: Scanner,
  Splash: SplashScreen,
  Credit: CreditScreen,
  Credit: CreditScreen,
  Payment: PaymentScreen,
  CheckBill: CheckBill,
  AddminHome: AddminHomeScreen,
  AddminLogin: AddminLoginScreen,
  ProfileEdit: ProfileEditScreen,


  Home: HomeScreen,
  History: HistoryScreen,
  Billament: QrcodeScreen,
  BillInfo: BillInfoScreen,
  Scanner: Scanner,

  Login: LoginScreen,
  SignIn: SignIn,
  SignUp: SignUp,
  OTP: OTPScreen,
  Phone: PhoneScreen,

  AdSignIn: AdSignIn,
})

const AppContent = createAppContainer(Navigator);

export default AppContent;
