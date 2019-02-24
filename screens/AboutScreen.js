import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { Avatar, ListItem, Button, Text } from 'react-native-elements';

export default class AboutScreen extends React.Component {

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
          <Text h3 style={styles.title}>Our team</Text>
      <Text>Ylenia, Ana, Andrea</Text>
      <View style={{ flex: 1 }}>
      <Image style={styles.image} source={require('../assets/images/team.jpg')} resizeMode="contain" />
      </View>
      
     * content, we just wanted to give you a quick view of your config */

    return <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
      <Image style={styles.image} source={require('../assets/images/icon.png')} resizeMode="contain" />
      </View>
    </View>;
  }
}


const styles = StyleSheet.create({
  camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  view: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  flip: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  image: { flex: 1, height: undefined, width: undefined },
  text: { fontSize: 18, marginBottom: 10, color: 'white' },
  btn: {
    borderRadius: 5,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    textAlign: 'center',
    marginTop: -10,
    fontSize: 20,
  }
});
