import React from 'react';
import { Text, View, Image, FlatList, TouchableHighlight, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import BigCLogo from '../../assets/bigc.png'
import VinmartLogo from '../../assets/vinmart.png'
import Kmartlogo from '../../assets/kmart.png'
import CoopmartLoogo from '../../assets/coopmart.png'

import API from '../api/api.main';

const ListItem = props => {
  return (
    <TouchableHighlight
      style={{ flex: 1, }}
      underlayColor='transparent'
      onPress={() => {
        props.navigate();
      }}>
      <View>
        <Image
          source={{ uri: props.image }}
          style={{ width: 150, height: 150, borderRadius: 20, resizeMode: 'cover' }} />
      </View>
    </TouchableHighlight>
  )
}

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      stores: [
        { name: 'BigC', image: BigCLogo },
        { name: 'KMart', image: Kmartlogo },
        { name: 'CoopMart', image: CoopmartLoogo },
        { name: 'VinMart', image: VinmartLogo },
      ]
    }
  }

  getList() {
    API.getAllStoresList(this.props.token)
      .catch(error => console.log('error when get stores list', error))
      .then(result => {
        this.props.dispatch({ type: 'change-store-list', value: result });
        this.renderList(result);
      })
  }

  componentDidMount() {
    this.getList();
  }

  renderList(storesList = []) {
    var row = [];
    var list = [];
    var j = 0;

    storesList.map((item, index) => {
      j++;
      row.push(item);
      if (j == 2 || (index == storesList.length - 1 && j == 1)) {
        list.push(row);
        j = 0;
        row = [];
      }

      if (index == storesList.length - 1) {
        this.setState({ list: list });
      }
    })
  }

  render() {
    return (
      <View style={{
        paddingTop: 70,
        paddingRight: 25,
        paddingLeft: 25,
      }}>

        <ScrollView style={{ width: '100%', height: '100%' }} showsVerticalScrollIndicator={false}>
          <View style={{}}>
            {
              this.state.list.map((row, index) => (
                <View key={`item-list-row-${index}`} style={{ flexDirection: 'row', paddingBottom: 20 }}>
                  {row.map((item, j) => {
                    return (
                      <ListItem key={`-das-${j}-listitem`} image={item.image} navigate={() => {
                        this.props.navigation.navigate('Scanner', { storeName: item.name, storeKey: item.key });
                      }} />
                    )
                  })}
                </View>
              ))
            }
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default connect(state => {
  return {
    token: state.token,
    navigation: state.navigation,
    storesList: state.storesList,
  }
})(List);