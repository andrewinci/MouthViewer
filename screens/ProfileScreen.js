import React from 'react';
import { View, ScrollView, Platform, StyleSheet } from 'react-native';
import { Avatar, ListItem, Button, Text } from 'react-native-elements';
import { Icon } from 'expo';
import UserManager from '../helpers/UsersManager';
import Colors from '../constants/Colors';

export default class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { users: UserManager.retrieveUsers() }
    }

    componentDidMount() {
        let user = this.props.navigation.getParam('user', null);
        console.log(user);
        if (user == null) return;
        this.setState({ user: user });
    }


    buildRightIcon() {
        return <Icon.Ionicons
            name={Platform.OS === 'ios' ? 'ios-arrow-forward' : 'md-arrow-forward'} size={30}
            style={{ marginBottom: -3 }}
            color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />;
    }

    onRegistrationComplete(){
        let cb = this.props.navigation.getParam('onRegistrationComplete', null);
        if (cb) cb();
        this.componentDidMount();
    }

    render() {
        let avatar = null;
        let username = this.state.user != null && this.state.user.name != null ? this.state.user.name :'' ;
        if (this.state.user != null && this.state.user.image != null) {
            avatar = <Avatar
                size="xlarge"
                rounded
                title="A"
                source={this.state.user.image} />;

        }
        else {
            avatar = <Avatar
                size="xlarge"
                rounded
                title="A" />
        }

        return (
            <ScrollView style={styles.container}>
                <Text h2 style={styles.title}>{username}</Text>
                <View style={styles.avatar_style}>
                    {avatar}
                </View>

                <ListItem
                    style={styles.item}
                    rightIcon={this.buildRightIcon()}
                    onPress={() => { this.props.navigation.navigate('Test', { user: this.state.user }) }}
                    title='Sceening' />
                <ListItem
                    style={styles.item}
                    rightIcon={this.buildRightIcon()}
                    onPress={() => { this.props.navigation.navigate('History') }}
                    title='History' />
                <ListItem
                    style={styles.item}
                    rightIcon={this.buildRightIcon()}
                    onPress={() => { this.props.navigation.navigate('Register',  
                    { 
                        user: this.state.user,
                        onRegistrationComplete: ()=> this.onRegistrationComplete(),
                    }) }}
                    title='Details' />
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    btn: {
        borderRadius: 5,
        margin: 10,
    },
    avatar_style: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    item: {
        margin: 5
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 10,
    },
    title: {
        textAlign: 'center',
        marginTop: -10,
    }

});
