import React, {useCallback, useEffect, useReducer, useState} from "react";
import {Alert, Platform, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import {useDispatch, useSelector} from "react-redux";
import * as productActions from '../../store/actions/products';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.updatedValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValues: updatedValues,
            inputValidities: updatedValidities
        }
    }
}

const EditProductScreen = props => {

    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [titleIsValid, setTitleIsValid] = useState(false);
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');
    const dispatch = useDispatch();
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: ''
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: true
        },
        formIsValid: editedProduct ? true : false
    });

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong input', 'Title is not valid', [{text: 'Ok'}]);
            return;
        }
        if (editedProduct) {
            dispatch(productActions.updateProduct(prodId, formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl));
        } else {
            dispatch(productActions.createProduct(formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl, +formState.inputValues.price));
        }
        props.navigation.goBack();
    }, [dispatch, prodId, formState]);

    useEffect(() => {
        props.navigation.setParams({submit: submitHandler});
    }, [submitHandler]);

    const textChangeHandler = (inputIdentifier, text) => {
        let isValid = false;
        if (text.trim().length > 0) {
            isValid = true;
        }
        dispatchFormState({type: FORM_INPUT_UPDATE, value: text, valid: isValid, input: inputIdentifier});
    }

    return <ScrollView>
        <View style={styles.form}>
            <View style={styles.formControl}>
                <Text style={styles.label}>Title: </Text>
                <TextInput style={styles.input}
                           value={formState.inputValues.title}
                           onChangeText={textChangeHandler.bind(this, 'title')}
                           keyboardType='default'
                           autoCapitalize='sentences'
                           autoCorrect
                           returnKeyType='next'
                />
                {!formState.inputValidities.title && <Text>Enter valid title!</Text>}
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>Image URL: </Text>
                <TextInput style={styles.input}
                           value={formState.inputValues.imageUrl}
                           onChangeText={textChangeHandler.bind(this, 'imageUrl')}/>
                {!formState.inputValidities.imageUrl && <Text>Enter valid url!</Text>}
            </View>
            {editedProduct ? null : (<View style={styles.formControl}>
                <Text style={styles.label}>Price: </Text>
                <TextInput style={styles.input}
                           value={formState.inputValues.price}
                           onChangeText={textChangeHandler.bind(this, 'price')}
                           keyboardType='decimal-pad'
                />
                {!formState.inputValidities.price && <Text>Enter valid price!</Text>}
            </View>)}
            <View style={styles.formControl}>
                <Text style={styles.label}>Description: </Text>
                <TextInput style={styles.input}
                           value={formState.inputValues.description}
                           onChangeText={textChangeHandler.bind(this, 'description')}/>
                {!formState.inputValidities.description && <Text>Enter valid description!</Text>}
            </View>
        </View>
    </ScrollView>;
}

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Save'
                  iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                  onPress={submitFn}/>
        </HeaderButtons>)
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});

export default EditProductScreen;