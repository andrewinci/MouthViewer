import React from 'react';
import { ScrollView, Platform, StyleSheet, Text } from 'react-native';
import { Avatar, ListItem, Button } from 'react-native-elements';
import { Icon } from 'expo';
import UserManager from '../helpers/UsersManager';
import Colors from '../constants/Colors';


export default class UsersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: UserManager.retrieveUsers() }
  }

  static navigationOptions = {
    title: 'Users',
  };

  onRegistrationComplete() {
    this.setState({ users: UserManager.retrieveUsers() })
  }

  showRegistration() {
    this.props.navigation.navigate('Register', { onRegistrationComplete: () => this.onRegistrationComplete() });

  }

  buildRightIcon() {
    return <Icon.Ionicons
      name={Platform.OS === 'ios' ? 'ios-arrow-forward' : 'md-arrow-forward'} size={30}
      style={{ marginBottom: -3 }}
      color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />;
  }

  render() {

    return (
      <ScrollView style={styles.container}>
        {
          this.state.users.map((user, i) =>
            (<ListItem
              key={i}
              style={styles.item}
              leftAvatar={<Avatar rounded source={user.image} />}
              rightIcon={this.buildRightIcon()}
              onPress={() => this.props.navigation.navigate('Profile',
                {
                  user: user,
                  onRegistrationComplete: () => this.onRegistrationComplete()
                })}
              title={user.name} />)
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
