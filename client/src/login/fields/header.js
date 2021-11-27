import React from 'react'
import { View, Text, TouchableHighlight, } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
export default (navigation, background, title, height) => (
  <View style={{
    width: '100%',
    height: height ? height : 150,
    backgroundColor: background ? background : '#f7a40d',
    paddingTop: height ? 40 : 65,
    paddingLeft: 25,
  }}>
    <TouchableHighlight
      onPress={() => { console.log('goback login'); navigation.goBack() }}
      underlayColor='transparent'
      style={{ width: 100 }} ><Icon name='arrowleft' color={background == '#000' ? 'white' : 'black'} size={30} /></TouchableHighlight>
    <Text style={{
      color: '#fff',
      fontSize: 30,
      letterSpacing: 3,
    }}>
      {title}
    </Text>
  </View>
)