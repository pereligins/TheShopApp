import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {combineReducers, createStore} from "redux";
import {Provider} from 'react-redux';

import productsReducer from './store/reducer/products';
import cartReducer from './store/reducer/cart';
import ordersReducer from './store/reducer/orders';
import ShopNavigator from "./navigation/ShopNavigator";

import {AppLoading} from "expo";
import * as Font from 'expo-font';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer
});

const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App() {
  const [fontLoaded, serFontLoaded] = useState(false);

  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => {
      serFontLoaded(true);
    }
    }/>
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
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
