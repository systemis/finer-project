import React from 'react';
import {
  Alert,
  BackHandler
} from 'react-native';

import { connect } from 'react-redux';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

import Icon from 'react-native-vector-icons/AntDesign';
import EIcon from 'react-native-vector-icons/EvilIcons';

import ProfileScreen from './profile';
import ListScreen from './list';

const TabNavigation = createBottomTabNavigator({
  Home: ListScreen,
  Profile: ProfileScreen,
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      if (routeName === 'Home') {
        // You can check the implementation below.
        return <Icon name={'home'} size={25} color={tintColor} />;
      } else if (routeName === 'Profile') {
        return <EIcon name={'user'} size={25} color={tintColor} />;
      }
    },
  }),
  tabBarOptions: {
    activeTintColor: '#000',
    inactiveTintColor: 'gray',
    style: {
      borderTopWidth: 0.1,
      backgroundColor: '#fff',
      borderTopColor: 'transparent'
    },
  },
})

const AppContent = createAppContainer(TabNavigation);

var HomeScreen = connect(state => { return { info: state.info } })(class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scanned: false,
      showScanner: false,
      barCodeTypes: [
        'org.gs1.EAN-13',
      ]
    }
  }

  static navigationOptions = { header: null, gesturesEnabled: false, }

  componentDidMount() {
    this.props.dispatch({ type: 'change-navigation', value: this.props.navigation })
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return false;
    })
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    this.getInfo(data);

    Alert.alert(`type: ${type} data: ${data}`);
  };

  render() {
    return (
      <AppContent />
    )
  }
});


export default connect(state => { return { Socket: state.Socket, } })(HomeScreen);
