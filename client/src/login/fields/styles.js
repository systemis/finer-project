import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  container: {
    backgroundColor: '#f7a40d',
    height: '100%',
    width: '100%',
    position: 'relative',
  },

  main: {
    height: '100%',
    width: '100%',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: 'white',

    paddingTop: 30,
    paddingRight: 25,
    paddingLeft: 25,

  },

  textField: {
    width: '100%',

    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 25,
    marginBottom: 20,
  },

  orTextField: {
    marginTop: 30,
    marginBottom: 30,
    width: '100%',
    textAlign: 'center',
    fontSize: 14,
  },

  facebookContainer: {
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 15,
    paddingTop: 15,
    backgroundColor: '#4274a7',
    borderRadius: 25,
  },

  fbLoginText: {
    marginLeft: 15,
    color: '#fff',
  },

  circleButton: {
    backgroundColor: '#b9b9b97a',
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    flexDirection: 'row',
    alignItems: 'center',
  },

  textincircle: {
    color: 'gray',
    width: '100%',
    textAlign: 'center',
  }
})