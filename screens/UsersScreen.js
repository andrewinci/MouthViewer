import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Avatar, ListItem, Button } from 'react-native-elements';


export default class UsersScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {isVisible: false };
  }

  static navigationOptions = {
    title: 'Users',
  };

  showRegistration(){
    this.setState({isVisible: true });
  }

  render() {

    const {navigate} = this.props.navigation;
    const babyes = [
      { name: 'Baby one', image: require('../assets/images/child1.jpg') },
      { name: 'Baby two', image: require('../assets/images/child2.jpg') },
    ]
    return (
     
      <ScrollView style={styles.container}>
        {
          babyes.map((b, i) =>
            (<ListItem
              key={i}
              style={styles.item}
              leftAvatar={<Avatar rounded source={b.image} />}
              title={b.name} />)
          )
        }
        <Button buttonStyle={styles.btn} title="Add a new one" onPress={() => navigate('Register')}></Button>
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
