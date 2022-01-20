import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';

import Header from '../login/fields/header';
import styles from '../login/fields/styles';

import Icon from 'react-native-vector-icons/Feather';

const Item = props => (
  <View style={{
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    marginBottom: 10,
    paddingBottom: 10,
  }}>
    <View style={{ flex: 1 }}>
      <Image
        source={{ uri: props.info.image }}
        style={{
          height: 100,
          width: 100,
          alignSelf: 'center',
          resizeMode: 'contain',
        }}
      />
    </View>
    <View style={{ flex: 3 }}>
      <Text>{props.info.name}</Text>
      <View>
        <Text style={{ width: '100%', textAlign: 'right' }}>
          x{props.info.count}
        </Text>
        <Text style={{ width: '100%', textAlign: 'right' }}>
          {props.info.price}
        </Text>
      </View>
    </View>
  </View>
)

class BillInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { info: {} };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: Header(navigation, '#000', 'Bill Info')
    }
  }

  componentWillMount() {
    this.setState({ info: this.props.route.params.info });
  }

  render() {
    return (
      <View style={{ ...StyleSheet.flatten(styles.container), backgroundColor: '#000' }}>
        <View style={{
          ...StyleSheet.flatten(styles.main),
        }}>

          <View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, }}>
                <Icon name='truck' color='black' size={25} />
              </View>
              <View style={{ flex: 9 }}>
                <Text style={{
                  fontSize: 20,
                  letterSpacing: 2,
                }}>Thông tin thanh toán</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, }} />
              <View style={{ flex: 9, }}>


                <View style={_style.infoRow}>
                  <Text style={_style.infoRowTitle}>Store </Text>
                  <Text style={_style.infoRowValue}>{this.state.info.storeName}</Text>
                </View>
                <View style={_style.infoRow}>
                  <Text style={_style.infoRowTitle}>Admin </Text>
                  <Text style={_style.infoRowValue}>{this.state.info.addmin}</Text>
                </View>
                <View style={_style.infoRow}>
                  <Text style={_style.infoRowTitle}>Total </Text>
                  <Text style={_style.infoRowValue}>{this.state.info.total}</Text>
                </View>
              </View>
            </View>
          </View>


          <View style={{
            paddingTop: 10,
          }}>
            <FlatList
              style={{ height: '100%' }}
              keyExtractor={() => Math.random().toString()}
              data={this.state.info.products}
              renderItem={({ item, index }) => {
                return (
                  <Item info={item} />
                )
              }}
            />

          </View>
        </View>
      </View>
    )
  }
}

const _style = StyleSheet.create({
  infoRow: {
    flexDirection: 'row', width: '100%',
    paddingBottom: 5,
  },

  infoRowTitle: {
    flex: 3,
  },
  infoRowValue: {
    flex: 7,
    width: '100%',
    textAlign: 'right'
  },
})

export default BillInfo;