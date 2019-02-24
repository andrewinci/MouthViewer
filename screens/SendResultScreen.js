import React from 'react';
import { ActivityIndicator, Image, View, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Text, Slider, Input, Button, CheckBox } from 'react-native-elements';
import UserManager from '../helpers/UsersManager';

export default class SendResultScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { message_received: false };
    }

    async delay(millis) {
        return new Promise(resolve => setTimeout(resolve, millis));
    }

    async receiveMessage() {
        if (this.state.message_received) return;
        await this.delay(2000);
        this.setState({ message_received: true });
    }

    buildUploadingView() {
        return <View>
            <Text h2 style={styles.title}>Uploading...</Text>
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#007aff" />
            </View>
            <Text style={styles.subtitle}>We are checking your mouth...</Text>
        </View>
    }

    buildResultView() {
        return <View>
            <Text h2 style={styles.title}>Result</Text> 
            <Text style={styles.subtitle}>Your result</Text>
            <Button buttonStyle={styles.btn_first} title="Back" onPress={() => this.props.navigation.navigate('Users')} ></Button>
        </View>
    }


    render() {

        if (!this.state.message_received) {
            this.receiveMessage();
            return this.buildUploadingView();
        }
        return this.buildResultView();
    }
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
    },
    subtitle: {
        marginTop: 40,
        textAlign: 'center',
    },
    container: {
        marginTop: 200,
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
});
