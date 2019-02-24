import React from 'react';
import { ActivityIndicator, Image, View, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Text, Slider, Input, Button, CheckBox } from 'react-native-elements';
import UserManager from '../helpers/UsersManager';

import { Icon } from 'expo';

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

    buildSuccessIcon() {
        return <Icon.Ionicons
            name='ios-checkmark-circle'
            size={26}
            style={{ marginTop: 10 }}
            color={'green'}
        />
    }

    buildErrorIcon() {
        return <Icon.Ionicons
            name='ios-close-circle'
            size={26}
            style={{ marginBottom: -5 }}
            color={'red'}
        />
    }

    buildWarningIcon() {
        return <Icon.Ionicons
            name='ios-warning'
            size={26}
            style={{ marginBottom: -5 }}
            color={'orange'}
        />
    }

    buildResultView() {
        return <View>
            <Text h2 style={styles.title}>Result</Text>
            <Text style={[styles.positive]}>{this.buildSuccessIcon()} No inflamation</Text>
            <Text style={styles.warning}>{this.buildWarningIcon()} Low tonsilittis risk</Text>
            <Text style={styles.alert}>{this.buildErrorIcon()} High tonsillitis risk</Text>
            <Text style={styles.alert}>{this.buildErrorIcon()} Risk of bacterial infection go to the GP</Text>
            <Button buttonStyle={styles.btn} title="Back" onPress={() => this.props.navigation.navigate('Users')} ></Button>
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
    positive: {
        marginTop: 30,
        textAlign: 'center',
        color: 'green'
    },
    warning: {
        marginTop: 30,
        textAlign: 'center',
        color: 'orange'
    },
    alert: {
        marginTop: 30,
        textAlign: 'center',
        color: 'red'
    },
    container: {
        marginTop: 200,
        flex: 1,
        justifyContent: 'center'
    },
    btn: {
        marginTop: 30,
        margin: 10,
    }
});
