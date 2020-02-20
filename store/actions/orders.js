import Product from "../../models/product";
import {SET_PRODUCTS} from "./products";
import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
    return async dispatch => {

        try {
            const response = await fetch('https://udemy-education-project.firebaseio.com/orders/u1.json');

            if (!response.ok) {
                throw new Error('Sometnhind went wrong.');
            }

            const responseData = await response.json();

            const loadedOrders = [];

            for (const key in responseData) {
                loadedOrders.push(new Order(
                    key,
                    responseData[key].cartItems,
                    responseData[key].totalAmount,
                    new Date(responseData[key].date)
                ));
            }

            dispatch ({type: SET_ORDERS, orders: loadedOrders});
        } catch (err) {
            throw err;
        }

    }
}

export const addOrder = (cartItems, totalAmount) => {
    return async dispatch => {

        const date = new Date();

        const response = await fetch(`https://udemy-education-project.firebaseio.com/orders/u1.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString()
            })
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        dispatch({
            type: ADD_ORDER,
            orderData: {
                id: response.name,
                cartItems: cartItems,
                amount: totalAmount
            },
            date: date
        });
    }
}