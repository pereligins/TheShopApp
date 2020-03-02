import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {combineReducers, createStore, applyMiddleware} from "redux";
import {Provider} from 'react-redux';

import productsReducer from './store/reducer/products';
import cartReducer from './store/reducer/cart';
import ordersReducer from './store/reducer/orders';
import authReducer from "./store/reducer/auth";
import NavigationContainer from "./navigation/NavigationContainer";

import {AppLoading} from "expo";
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk'

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => {
      setFontLoaded(true);
    }
    }/>
  }

  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
