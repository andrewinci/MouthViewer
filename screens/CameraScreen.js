'use strict';
import React, { Component } from 'react';
import { Image, Platform, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { Camera, Permissions, Icon } from 'expo';
import Colors from '../constants/Colors';

export default class CameraScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            photo: null
        };
    }


    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    onFlipPress() {
        this.setState({
            type: this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
        });
    }

    onSave() {

        let cb = this.props.navigation.getParam('onPhotoTaken', null)
        if (cb) {
            cb(this.state.photo);
        }
        else {
            console.log('No parameter found')
        }
        this.props.navigation.goBack();
    }

    async onTakePicture() {
        if (this.camera) {
            this.camera.takePictureAsync().then(
                r => this.setState({ photo: r })
            );
        }
        //The local image URI is temporary. Use Expo.FileSystem.copyAsync to make a permanent copy of the image.
    }

    buildCameraView() {

        return <Camera ref={ref => { this.camera = ref; }} style={{ flex: 1 }} type={this.state.type} 
            flashMode={this.props.navigation.getParam('flash', false) ? 'on' : 'auto' }>
            <View style={styles.view}>
                <TouchableOpacity style={styles.flip} onPress={() => this.onFlipPress()}>
                    <Text style={styles.text}>{' '}Flip{' '}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.camera} onPress={() => this.onTakePicture()} >
                    <Icon.Ionicons
                        name={Platform.OS === 'ios' ? 'ios-camera' : 'md-camera'} size={40}
                        style={{ marginBottom: -3 }}
                        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
                    />
                </TouchableOpacity>
            </View>
        </Camera>
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else if (this.state.photo != null) {
            console.log(this.state.photo)
            return <View style={{ flex: 1 }}>
                <Image style={styles.image} source={this.state.photo} resizeMode="contain" />
                <Button buttonStyle={styles.btn} onPress={() => this.setState({photo: null})} title="Re-Take"></Button>
                <Button buttonStyle={styles.btn} onPress={() => this.onSave()} title="Save"></Button>
            </View>
        } else {
            return <View style={{ flex: 1 }}>
                {this.buildCameraView()}
            </View>

        }
    }
}


const styles = StyleSheet.create({
    camera: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    view: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
    },
    flip: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    image: { flex: 1, height: undefined, width: undefined },
    text: { fontSize: 18, marginBottom: 10, color: 'white' },
    btn: {
        borderRadius: 5,
        margin:5,
        marginLeft: 10,
        marginRight: 10,

    },
});
