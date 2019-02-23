import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Avatar, ListItem, Button } from 'react-native-elements';
import UserManager from '../helpers/UsersManager';


export default class UsersScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {users: UserManager.retrieveUsers()}
  }

  static navigationOptions = {
    title: 'Users',
  };

  onRegistrationComplete(){
    this.setState({users: UserManager.retrieveUsers()})
  }

  showRegistration(){
    this.props.navigation.navigate('Register', {onRegistrationComplete: () => this.onRegistrationComplete()});
    
  }

  render() {
    return (
      
      <ScrollView style={styles.container}>
        {
          this.state.users.map((b, i) =>
            (<ListItem
              key={i}
              style={styles.item}
              leftAvatar={<Avatar rounded source={b.image} />}
              title={b.name} />)
          )
        }
        <Button buttonStyle={styles.btn} title="Add a new one" onPress={() => this.showRegistration()}></Button>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 5,
    margin: 10,
  },
  item: {
    margin: 5
  },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },

});
