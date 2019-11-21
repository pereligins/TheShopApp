import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {combineReducers, createStore} from "redux";
import {Provider} from 'react-redux'

import productsReducer from '/store/reducer/products'

const rootReducer = combineReducers({
  products: productsReducer
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <View></View>
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
