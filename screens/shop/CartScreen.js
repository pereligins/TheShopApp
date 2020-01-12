import React from "react";
import {View, Text, FlatList, StyleSheet, Button} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from '../../store/actions/cart'
import * as orderActions from '../../store/actions/orders'
import Card from "../../components/UI/Card";

const CartScreen = props => {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const CartItemsArray = [];
        for (const key in state.cart.items) {
            CartItemsArray.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }
        return CartItemsArray.sort((a,b)=> a.productId > b.productId ? 1 : -1);
    });

    const dispatch = useDispatch();

    return (<View style={styles.screen}>
        <Card style={styles.summary}>
            <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100 / 100)}</Text></Text>
            <Button title="Order Now"
                    color={Colors.accent}
                    disabled={cartItems.length === 0}
                    onPress={() => {dispatch(orderActions.addOrder(cartItems, cartTotalAmount))}}
            />
        </Card>
        <FlatList data={cartItems}
                  keyExtractor={item => item.productId}
                  renderItem={
                      itemData => <CartItem quantity={itemData.item.quantity}
                      title={itemData.item.productTitle}
                      amount={itemData.item.sum}
                      onRemove={()=>{dispatch(cartActions.removeFromCart(itemData.item.productId))}}
                      deletable />
                  }/>
    </View>);
}

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    }

});

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
};

export default CartScreen;