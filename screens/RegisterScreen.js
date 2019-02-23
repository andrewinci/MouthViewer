import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Input, Avatar, Button } from 'react-native-elements';
import UserManager from '../helpers/UsersManager';

export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { photo: null, name: null, age: '' };
  }

  componentDidMount(){
    let user = this.props.navigation.getParam('user', null);
    if (user) this.setState({photo: user.image, name: user.name, age: user.age})
  }

  takePicture() {
    this.props.navigation.navigate('Camera', { onPhotoTaken: (p) => this.setState({ photo: p }) });
  }

  onSavePress() {
    let user = this.props.navigation.getParam('user', null)
    if (user == null)
      UserManager.addUser({ name: this.state.name, image: this.state.photo, age: this.state.age });
    else {
      user.name = this.state.name;
      user.image = this.state.photo;
      user.age = this.state.age;
      UserManager.updateUser( user );
    }
    let cb = this.props.navigation.getParam('onRegistrationComplete', null)
    if (cb) cb();
    this.props.navigation.goBack();
  }

  render() {
    var avatar = (this.state.photo != null ?
      <Avatar
        size="xlarge"
        rounded
        title="A"
        onPress={() => this.takePicture()}
        source={this.state.photo}
        showEditButton /> :
      <Avatar
        size="xlarge"
        rounded
        title="A"
        onPress={() => this.takePicture()} 
        showEditButton />)
        
    return <ScrollView style={styles.container}>
      <View style={styles.avatar_style}>
        {avatar}
      </View>
      <Input label='Name' onChangeText={(text) => this.setState({ name: text })} value={this.state.name} />
      <Input label='Age' onChangeText={(text) => this.setState({ age: text })} value={this.state.age} />
      <Button buttonStyle={styles.btn} title="Save" onPress={() => this.onSavePress()}></Button>
    </ScrollView>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text_input: {
    marginTop: 20,
    margin: 10,
  },
  avatar_style: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  btn: {
    alignItems: 'center',
    borderRadius: 5,
    margin: 10,
    marginTop: 20,
  },
});
