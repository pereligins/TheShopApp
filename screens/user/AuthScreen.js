import React, {useCallback, useReducer} from 'react';
import {View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Button} from 'react-native';
import Card from "../../components/UI/Card";
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch} from "react-redux";

import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";
import * as authActions from '../../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

const AuthScreen = props => {
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password:false
        },
        formIsValid: false
    });

    const signupHandler = () => {
        dispatch(authActions.signup(formState.inputValues.email, formState.inputValues.password));
    }

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    );

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
                           errorText='Please enter a valid email address.'
                           onInputChange={inputChangeHandler}
                           initialValue=''
                    />
                    <Input id='password'
                           label='Password'
                           keyboardType='default'
                           secureTextEntry
                           required
                           minLength={5}
                           autoCapitalize='none'
                           errorText='Please enter a valid password.'
                           onInputChange={inputChangeHandler}
                           initialValue=''
                    />
                    <View style={styles.buttonContainer}>
                        <Button title='Login' onPress={signupHandler} color={Colors.primary}/>
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

