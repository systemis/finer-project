import { AsyncStorage } from 'react-native';
export default new class DBManager {
  constructor() {
    this.names = {
      token: '@token_data_loginFb'
    }
  }

  async saveToken(type = 'user', token) {
    var tokenBundle = { type, token };
    try {
      await AsyncStorage.setItem(this.names.token, JSON.stringify(tokenBundle));
      return true;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  }

  async getToken() {
    try {
      var tokenBundle = await AsyncStorage.getItem(this.names.token);
      tokenBundle = JSON.parse(tokenBundle);
      return tokenBundle;
    } catch (error) {
      return null;
    }
  }
}