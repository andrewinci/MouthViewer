import React from 'react';
import {  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Add user',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <View>
      <Text>Add here informations about the app</Text>
    </View>;
  }
}
