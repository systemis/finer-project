import React from 'react';
import { View, Image, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { FormatPrice } from './api/format';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class ProductItem extends React.Component {
  render() {
    return (
      <View style={styles.productItemContainer}>
        <View style={styles.productShowImage}>
          <Image
            style={styles.productImage}
            source={{ uri: this.props.info.image }} />
        </View>
        <View style={styles.productShowName}>
          <Text style={styles.productName}>{this.props.info.name}</Text>
          <Text style={styles.productPrice}>
            {FormatPrice((
              this.props.info.price
            ).toString())}
          </Text>
          <Text style={styles.productcounttext}>x{this.props.info.count}</Text>
        </View>
        <View style={styles.productControlContainer}>
          <View style={styles.productControlChild}>
            <TouchableHighlight
              underlayColor='transparent'
              onPress={() => this.props.delete()}>
              <Icon name='delete-outline' color='#000' size={18} />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },

  productCountButton: {
    backgroundColor: 'gray',
    borderRadius: 50,
    width: 30,
    height: 30,
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'row',
  },

  productcounttext: {
    paddingTop: 3,
    paddingBottom: 5,
    color: 'gray'
  },

  productItemContainer: { flexDirection: 'row', flex: 1, paddingBottom: 15, },
  productShowImage: { flex: 2, },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },

  productShowName: { flex: 4, },
  productName: {
    fontSize: 17,
    letterSpacing: 1,
  },
  productPrice: {
    fontSize: 14,
    letterSpacing: 1,
  },

  productControlContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },

  productControlChild: {
    alignItems: 'center',
    width: '100%',
  },
})

