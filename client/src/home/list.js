import _ from 'lodash';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  View, 
  Image, 
  TouchableHighlight, 
  ScrollView, 
  StyleSheet, 
} from 'react-native';
import { connect } from 'react-redux';

import BigCLogo from '../../assets/bigc.png'
import VinmartLogo from '../../assets/vinmart.png'
import Kmartlogo from '../../assets/kmart.png'
import CoopmartLoogo from '../../assets/coopmart.png'

const StoreItem = props => {
  return (
    <TouchableHighlight
      style={{ flex: 1, }}
      underlayColor='transparent'
      onPress={() => {
        props.navigate();
      }}>
      <View>
        <Image
          source={props.image}
          style={{ width: 150, height: 150, borderRadius: 20, resizeMode: 'cover' }} />
      </View>
    </TouchableHighlight>
  )
}


const ListScreen = (props) => {
  const [storeList, setStoreList] = useState([]);

  useEffect(() => {
    setStoreList([
      { image: BigCLogo, name: 'BigC', id: '29dedc-002dcs-xx2s'}, 
      { image: VinmartLogo, name: 'Vinmart', id: '29dedc-00dcs-xx2s'}, 
      { image: Kmartlogo, name: 'Kmart', id: '29dedc-002dcs-x2s'}, 
      { image: CoopmartLoogo, name: 'Coopmart', id: '29dedc-02dcs-xx2s'}, 
    ]);
  }, []);

  const handleClick = (item) => {
    return props.navigation.navigate('Scanner', { 
      storeName: item.name, 
      storeId: item.id 
    });
  }
  
  const Layout = useMemo(() => {
    const rows = _.chunk(storeList, 2);
    return rows.map((item, index) => {
      return (
        <View key={`store-row-${index}`} style={styles.rowContainer}> 
          {item.map((childItem, childIndex) => (
            <StoreItem 
              key={`store-item-${childIndex}`}
              image={childItem.image} 
              navigate={() => handleClick(childItem)}/>
          ))}
        </View>
      );   
    })
  }, [storeList])

  return (
    <View style={styles.pageContainer}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {Layout}
      </ScrollView>
    </View>
  )
};

export default connect(state => {
  return {
    token: state.token,
    navigation: state.navigation,
    storesList: state.storesList,
  }
})(ListScreen);

const styles = StyleSheet.create({
  pageContainer: {
    paddingTop: 70,
    paddingRight: 25,
    paddingLeft: 25,
  }, 
  scrollContainer: {
    width: '100%', 
    height: '100%'
  }, 
  rowContainer: {
    flexDirection: 'row', 
    paddingBottom: 50, 
  }, 
});