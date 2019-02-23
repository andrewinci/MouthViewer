import React from 'react';
import { ActivityIndicator, Image, View, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Text, Slider, Input, Button, CheckBox } from 'react-native-elements';
import UserManager from '../helpers/UsersManager';

export default class SendResultScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <View>
            <Text h2 style={styles.title}>Uploading...</Text>
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#007aff" />
            </View>
            <Text style={styles.subtitle}>We are checking your mouth...</Text>
        </View>
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
        marginTop:200,
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
});
