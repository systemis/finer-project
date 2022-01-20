import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableHighlight, Platform, } from 'react-native';
import { FormatPrice } from '../api/format';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import API from './api.addmin';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2UiOjEyLCJpbWFnZSI6Imh0dHBzOi8vZW5jcnlwdGVkLXRibjAuZ3N0YXRpYy5jb20vaW1hZ2VzP3E9dGJuJTNBQU5kOUdjUTRrQkY1VmZOeC1KS21Wa0Q1NVB1bXdLUmZFWlJOVllrYTNHZUlMdXdZU1J0S19FQXAiLCJsYXN0dGltZSI6IjIwMTgtMTAtMjBUMTQ6MjU6MDkuMjU3WiIsInBhc3N3b3JkIjoiMSIsInBob25lIjoiMDkwNTY2NzcyIiwic3RvcmVLZXkiOiItTHJLMFZxTE1JMzllcHNHUm1XNCIsInN0b3JlTmFtZSI6IkJpZ0MiLCJ1c2VybmFtZSI6InR1YW5waGFtMTI5MyIsImtleSI6Ii1MdlFvRV9kT2wzdjlHSjFlOUdlIiwiaWF0IjoxNjQyNjc4NjUwLCJleHAiOjE2NDI4MTg2NTB9.s8BbI204bpmwEOTx5TNZ5LUneFJeAfP8lmotPGryLQg";

const ProductItem = props => (
  <View style={{
    flexDirection: 'row',
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    paddingBottom: 15,
    paddingTop: 15,
  }}>
    <View style={{ flex: 1, }}>
      <Image source={{ uri: props.info.image }} style={{
        width: 120,
        height: 120,
        resizeMode: 'contain',
      }} />
    </View>
    <View style={{
      flex: 2,
      alignItems: 'flex-end',
      paddingRight: 15,
    }}>
      <Text style={{ fontSize: 18, letterSpacing: 1, lineHeight: 30, }}>{props.info.name}</Text>
      <Text style={{ color: 'gray', lineHeight: 45 }}>x{props.info.count}</Text>
      <Text>{FormatPrice(props.info.price)}</Text>
    </View>
  </View>
)


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f2f2f2',
    paddingTop: Platform.OS == 'ios' ? 55 : 40,
  },

  userinfoContainer: {
    width: '100%',
    paddingRight: 25,
    paddingLeft: 25,
    paddingTop: 15,
    paddingBottom: 15,
  },

  userinfoContent: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 20,
  },

  userinfoImageContainer: {
    flex: 2,
    padding: 10,
  },

  userinfoImage: {
    height: 80,
    width: 80,
    resizeMode: 'contain',
    borderRadius: 80 / 2,
  },

  userinfoContainerChild: {
    flex: 5, paddingTop: 10,
  },

  userinfoname: {
    fontSize: 20, lineHeight: 40
  },

  userinfoText: {
    fontSize: 13, letterSpacing: 1, lineHeight: 30,
  },

  productsContainer: {
    paddingLeft: 25,
    paddingRight: 25,
    height: Platform.OS == 'ios' ? 400 : 350
  },

  productsContent: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingTop: 15,
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 15,
  },

  bottomContainer: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    paddingTop: 25,
    paddingBottom: 25,
    paddingRight: 25,
    paddingLeft: 25,
  },

  totalContainer: {
    width: '100%', paddingRight: 15,
  },

  totaltext: {
    width: '100%',
    textAlign: 'right',
    fontSize: 18,
    letterSpacing: 1,
  },

  checkedButton: {
    backgroundColor: '#000',
    width: '100%',
    borderRadius: 20,
    paddingTop: Platform.OS == 'ios' ? 25 : 20,
    paddingBottom: Platform.OS == 'ios' ? 25 : 20,
  },

  checkedButtontext: {
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    letterSpacing: 2,
  }
})

class BillAddmin extends React.Component {
  state = {
    checked: false, texts: { _not: 'Không sử dụng bao ni lông' },
    info: {
      products: [
        {
          barcode: 9786048962296,
          count: 4,
          image: "https://i.imgur.com/aoga5eB.jpg",
          name: "Tất cả đã an bài",
          price: '89000',
        },
        {
          barcode: 9786048962296,
          count: 2,
          image: "https://sachvui.com/cover/2015/ca-phe-cung-tony.jpg",
          name: "Tony buổi sáng ",
          price: '150000',
        },
        {
          barcode: 9786048962296,
          count: 1,
          image: "https://img.sosanhgia.com/images/200x0/337f3187a6cd43a296f4374fc09b9dfa/sach-nguoi-dua-dieu.jpeg",
          name: "Người đua diều",
          price: '109000',
        }
      ],
      checked: false,
      storeName: "BigC",
      total: 348000,
      userid: "944135032588617_fb", code: '21',
      user: {
        id: "944135032588617_fb",
        image: "https://graph.facebook.com/944135032588617/picture?type=large",
        name: "Thịnh Phạm",
        phone: "0905631878",
        email: "systemofpeter@gmail.com",
      }
    }
  }

  static navigationOptions = {
    header: null,
  }

  checked() {
    console.log(token, this.state.info.code, this.state.checked);
    API.checkdoneReckoning(token, this.state.info.code, this.state.checked ? 2000 : 0, (result, error) => {
      console.log(result, error);

      if (result) return this.setState({ info: { ...this.state.info, checked: true } });
      if (error) console.log('error', error);
    })
  }

  componentDidMount() {
    console.log(this.props.route.params.info);
    this.setState({ info: this.props.route.params.info });
  }

  render() {
    const { checked } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.userinfoContainer}>
          <View style={styles.userinfoContent}>
            <View style={styles.userinfoImageContainer}>
              <Image
                source={{ uri: this.state.info.user.image }}
                style={styles.userinfoImage}
              />
            </View>
            <View style={styles.userinfoContainerChild}>
              <Text style={styles.userinfoname}>{this.state.info.user.name}</Text>
              <Text style={styles.userinfoText}>{this.state.info.user.email}</Text>
              <Text style={styles.userinfoText}>{this.state.info.user.phone}</Text>
              <Text style={styles.userinfoText}>
                Checked: <Icon
                  color={this.state.info.checked ? 'green' : '#000'}
                  size={16}
                  name={this.state.info.checked ? 'ios-radio-button-on' : 'ios-radio-button-off'} />
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.productsContainer}>
          <FlatList
            style={styles.productsContent}
            data={this.state.info.products}
            showsVerticalScrollIndicator={false}
            keyExtractor={() => Math.random().toString()}
            renderItem={({ item, index }) => (
              <ProductItem
                info={item}
                key={`product-item-${item}`}
                keyExtractor={() => Math.random() * 100}
              />
            )} />
        </View>

        <View style={{
          width: '100%',
          borderRadius: 20,
          paddingRight: 25,
          paddingLeft: 25,
          paddingTop: 10,
        }}>
          <View style={{
            width: '100%', backgroundColor: '#fff',
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 15,
            flexDirection: 'row',
            paddingRight: 15,
            paddingLeft: 15,
          }}>
            <Icon color={checked ? 'green' : '#000'} size={16} name={checked ? 'ios-radio-button-on' : 'ios-radio-button-off'} />
            <TouchableHighlight underlayColor='transparent' onPress={() => { this.setState({ checked: !checked, info: { ...this.state.info, _not: !checked, } }) }}>
              <Text style={{ letterSpacing: 1, fontSize: 14, marginLeft: 10, }}>
                {this.state.texts._not}
              </Text>
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totaltext}>Total {FormatPrice(this.state.info.total)}</Text>
          </View>
          <TouchableHighlight
            underlayColor='transparent'
            onPress={this.state.info.checked ? null : this.checked.bind(this)}
            style={{
              ...StyleSheet.flatten(styles.checkedButton),
              backgroundColor: this.state.info.checked ? 'gray' : '#000'
            }}>
            <Text style={styles.checkedButtontext}>Checked </Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

export default connect(state => {
  return { token: state.token }
})(BillAddmin);