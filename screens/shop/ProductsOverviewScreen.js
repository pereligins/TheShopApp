import React from 'react';
import {View, Text, FlatList} from "react-native";
import {useSelector} from "react-redux";

const ProductsOverviewScreen = props => {

    const products = useSelector(state => state.products.availableProducts);

    return (<FlatList data={products} keyExtractor={item => item.id} renderItem={itemData => <Text>itemData.title</Text>}/>);
}

styles = StyleSheet.create({

});

export default ProductsOverviewScreen;