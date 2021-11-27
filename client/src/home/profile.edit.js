import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  TextInput,
} from 'react-native';

import EIcon from 'react-native-vector-icons/EvilIcons';

const styles = StyleSheet.create({
  header: {
    paddingTop: 65,
    paddingBottom: 25,
    paddingLeft: 25,
    backgroundColor: '#fff'
  },

  container: {
    paddingRight: 25,
    paddingLeft: 25,
    paddingBottom: 15,
  },

  textField: {
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 25,
    marginBottom: 20,
    // backgroundColor: '#b9b9b97a',
  }
})

class ProfileEditScreen extends React.Component {
  state = {
    info: this.props.info || {
      name: 'Pham Van Thinh ', username: 'atee', email: 'ateedotcom@gmail.com', password: '1', passwordR: '1',
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: (<View style={styles.header}>
        <TouchableHighlight onPress={() => navigation.goBack()} underlayColor='transparent'>
          <EIcon name='close' color='#000' size={25} />
        </TouchableHighlight></View>),
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput value={this.state.info.name} onChangeText={value => this.setState({ info: { ...this.state.info, name: value } })} style={styles.textField} />
        <TextInput value={this.state.info.username} onChangeText={value => this.setState({ info: { ...this.state.info, username: value } })} style={styles.textField} />
        <TextInput value={this.state.info.email} onChangeText={value => this.setState({ info: { ...this.state.info, email: value } })} style={styles.textField} />
        <TextInput value={this.state.info.password} onChangeText={value => this.setState({ info: { ...this.state.info, password: value } })} style={styles.textField} />
      </View>
    )
  }
}

export default connect(state => {
  return {
    token: state.token,
    info: state.info
  }
})(ProfileEditScreen);