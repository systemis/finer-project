import React from 'React';
import { connect } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableHighlight,
} from 'react-native';

import Header from '../login/fields/header';
import styles from '../login/fields/styles';

const Item = props => (
  <TouchableHighlight
    underlayColor='transparent'
    onPress={() => props.next(props.info)}>
    <View style={{
      paddingBottom: 10,
      backgroundColor: '#fff',
      ...props.bonus,
      paddingTop: 25,
      marginBottom: 5,
    }}>
      <View style={{ flexDirection: 'row', paddingRight: 25, paddingLeft: 25, }}>
        <View style={{ flex: 1 }}>
          <Image
            style={{
              height: 100,
              width: 100,
              alignSelf: 'center',
              resizeMode: 'contain',
            }}
            source={{ uri: props.info.products[0].image }} />
        </View>
        <View style={{ flex: 3, paddingLeft: 20, paddingTop: 20 }}>
          <Text>{props.info.products[0].name}</Text>
          <View>
            <Text style={{ width: '100%', textAlign: 'right' }}>
              x{props.info.products[0].count}
            </Text>
            <Text style={{ width: '100%', textAlign: 'right' }}>
              {props.info.products[0].price}
            </Text>
          </View>
        </View>
      </View>
      <View style={{
        width: '100%',
        paddingRight: 25, paddingLeft: 25,
        paddingBottom: 15, paddingTop: 15,
      }}><View style={{
        height: 0.25,
        width: '100%',
        backgroundColor: 'gray',
      }} /></View>
      <View style={{
        flexDirection: 'row',
        paddingRight: 25, paddingLeft: 25,
      }}>
        <View style={{ flex: 2 }}><Text>{props.info.products.length} Product</Text></View>
        <View style={{ flex: 3, alignItems: 'flex-end' }}>
          <Text style={{ width: '100%', textAlign: 'right' }}>
            <Text>Total: </Text>
            <Text>{props.info.total}</Text>
          </Text>
        </View>
      </View>
    </View>
  </TouchableHighlight>
)

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: Header(navigation, '#000', 'History')
    }
  }

  render() {
    return (
      <View style={{
        ...StyleSheet.flatten(styles.container),
        margin: 0,
        backgroundColor: '#000'
      }}>
        <View style={{
          ...StyleSheet.flatten(styles.main),
          paddingTop: 0,
          paddingRight: 0,
          paddingLeft: 0,
          backgroundColor: '#f2f2f2',
        }}>
          {typeof this.props.History == 'object' && (
            <FlatList
              data={this.props.History || []}
              keyExtractor={() => (Math.random() * 100).toString()}
              renderItem={({ item, index }) => (
                <Item
                  info={item}
                  next={info => {
                    this.props.navigation.navigate('BillInfo', { info });
                  }}

                  bonus={index == 0 ? {
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30,
                    backgroundColor: 'white',
                  } : {}} />
              )}
            />
          )}
        </View>
      </View>
    )
  }
}

export default connect(state => {
  return {
    token: state.info.token,
    History: state.info.Orders,
  }
})(History);