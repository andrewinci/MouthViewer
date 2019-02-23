import React from 'react';
import { Image, View, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Text, Slider, Input, Button, CheckBox } from 'react-native-elements';
import UserManager from '../helpers/UsersManager';

export default class TestScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { photo: null, name: null };
    }

    componentDidMount() {
        let user = this.props.navigation.getParam('user', null);
        if (user == null) return;
        this.navigationOptions = { title: user.name };
        this.setState({ user: user });
    }

    takePicture() {
        this.props.navigation.navigate('Camera', { flash: true, onPhotoTaken: (p) => this.setState({ photo: p }) });
    }

    onSavePress() {
        UserManager.addUser({ name: this.state.name, image: this.state.photo });
        let cb = this.props.navigation.getParam('onRegistrationComplete', null)
        if (cb) cb();
        this.props.navigation.goBack();
    }

    render() {
        let username = '';
        if (this.state.user != null && this.state.user.name != null) {
            username = this.state.user.name;
        }
        const emptyImage = require('../assets/images/icon.png');
        let sendButton = null;
        if(this.state.photo !== null)
            sendButton = <Button buttonStyle={styles.btn} title="Send" ></Button>
        return <ScrollView style={styles.container}>
            <Text h2 style={styles.title}>{username}</Text>

            <Input label='Info 0' />
            <CheckBox title='Fever' checked={this.state.checked} onPress={() => this.setState({ checked: !this.state.checked })} />

            <Input label='Info 1' />
            <Input label='Info 2' />
            <Image style={styles.image} source={this.state.photo != null ? this.state.photo : emptyImage} resizeMode="contain"></Image>
            <Button buttonStyle={styles.btn_first} title="Attach photo" onPress={() => this.takePicture()} ></Button>
            {sendButton}
        </ScrollView>;
    }
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    text_input: {
        marginTop: 20,
        margin: 10,
    },
    btn_first: {
        alignItems: 'center',
        borderRadius: 5,
        margin: 10,
        marginTop: 20,
    },
    btn: {
        alignItems: 'center',
        borderRadius: 5,
        margin: 10,
        marginTop:0
    },
    image: {
        margin:10,
    }
});
    