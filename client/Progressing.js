import React from 'react';
import {
  View, ActivityIndicator,
} from 'react-native';

class ProgressingContainer extends React.Component {
  render() {
    return (
      <View style={{
        position: 'absolute',
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#0000005c'
      }}>
        <View style={{
          width: '100%',
          textAlign: 'center',
        }}>
          <ActivityIndicator
            size="large"
            color="#000" />
        </View>
      </View>
    )
  }
}

export default ProgressingContainer;