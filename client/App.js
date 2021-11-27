import React from 'react';
import {
  Text, View,
} from 'react-native';

import { Provider, connect } from 'react-redux';
import * as Permissions from 'expo-permissions';
import store from './redux/index';
import AppContent from './MainNavigator';
import ProgressingContent from './Progressing';
import dbManager from './src/api/db';

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

  // test 
  async componentWillMount() {
    // await dbManager.saveToken('', '');
  }

  async componentDidMount() {
    await this.getPermissionsAsync();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
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
      <View
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', }}>
        <AppContent />
        {this.props.progressing && <ProgressingContent />}
      </View>
    );
  }
})

const Index = () => (
  <Provider
    store={store}>
    <App />
  </Provider>
)

export default Index;
