import React from 'react';
import {View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Button} from 'react-native';
import Card from "../../components/UI/Card";
import { LinearGradient } from 'expo-linear-gradient';

import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";

const AuthScreen = props => {
    return <KeyboardAvoidingView
        behavior='padding'
        keyboardVerticalOffset={50}
        style={styles.screen}
    >
        <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
            <Card style={styles.authContainer}>
                <ScrollView>
                    <Input id='email'
                           label="Email"
                           keyboardType='email-address'
                           required
                           email
                           autoCapitalize='none'
                           errorMessage='Please enter a valid email address.'
                           onInputChange={() => {
                           }}
                           initialValue=''
                    />
                    <Input id='password'
                           label='Password'
                           keyboardType='default'
                           secureTextEntry
                           required
                           email
                           minLength={5}
                           autoCapitalize='none'
                           errorMessage='Please enter a valid password.'
                           onInputChange={() => {
                           }}
                           initialValue=''
                    />
                    <View style={styles.buttonContainer}>
                        <Button title='Login' onPress={() => {
                        }} color={Colors.primary}/>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title='Switch To Sign Up' onPress={() => {
                        }} color={Colors.accent}/>
                    </View>
                </ScrollView>
            </Card>
        </LinearGradient>
    </KeyboardAvoidingView>

};

AuthScreen.navigationOptions = {
    headerTitle: 'Authentificate'
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    buttonContainer: {
        marginTop: 10
    }
});

export default AuthScreen;

