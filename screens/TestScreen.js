import React from 'react';
import { Image, View, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Text, Overlay, Input, Button, CheckBox } from 'react-native-elements';
import UserManager from '../helpers/UsersManager';
import { Icon } from 'expo';

export default class TestScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { photo: null, name: null, questions: [], isVisible: false };
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

    buildTextAndInfo(text) {
        return <Text>{text + ' '}<Icon.Ionicons
            name='ios-information-circle-outline'
            size={20}
            style={{ marginBottom: -5 }}
            color="#007aff"
            onPress={() => this.setState({ isVisible: !this.state.isVisible })}
        />
        </Text>
    }

    render() {
        const questions = [
            'Sore throat', 'Difficulties in swallowing', 'Fatigue', 'Vomiting',
            'Fever', 'Caugh', 'Stuffy nose', 'Trouble opening mouth',
            'Earache', 'Exudote', 'Swallon nodes'
        ];
        let username = '';
        if (this.state.user != null && this.state.user.name != null) {
            username = this.state.user.name;
        }
        const emptyImage = require('../assets/images/empty_icon.png');
        let sendButton = null;
        if (this.state.photo !== null)
            sendButton = <Button buttonStyle={styles.btn} title="Send" onPress={() => this.props.navigation.navigate("SendResult")} ></Button>
        return <ScrollView style={styles.container}>
            <Text h2 style={styles.title}>{username}</Text>
            {
                questions.map((t, i) =>
                    <CheckBox
                        key={i}
                        title={this.buildTextAndInfo(t)}
                        checked={this.state.questions[i]}
                        onPress={() => {
                            this.setState({ checked: !this.state.checked });
                            this.state.questions[i] = !this.state.questions[i];
                        }}
                    >
                    </CheckBox>)
            }
            <Image style={styles.image} source={this.state.photo != null ? this.state.photo : emptyImage} resizeMode="contain"></Image>
            <Button buttonStyle={styles.btn_first} title="Attach photo" onPress={() => this.takePicture()} ></Button>
            {sendButton}
            <Overlay style={styles.overlay} isVisible={this.state.isVisible} height="auto">
                <ScrollView>
                    <Text h4 style={styles.title}>Info</Text>
                    <Text >A fever is a high temperature of 38C or more.
                    A normal temperature in babies and children is about 36.4C, but this can vary slightly from child to child.
                    </Text>
                    <Button buttonStyle={styles.btn_first} title="Got it" onPress={() => this.setState({ isVisible: false })} ></Button>
                </ScrollView>
            </Overlay>
        </ScrollView>;
    }
}

const styles = StyleSheet.create({
    overlay:{
        height:50,
        borderRadius:10,
    },
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
        marginTop: 0
    },
    image: {
        margin: 10,
        height: 200,
        width: 200,
    }
});
