import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async dispatch => {

        const response = await fetch('https://udemy-education-project.firebaseio.com/products.json');

        const responseData = await response.json();

        const loadedProducts = [];

        for (const key in responseData) {
            loadedProducts.push(new Product(key,
                'u1',
                responseData[key].title,
                responseData[key].imageUrl,
                responseData[key].description,
                responseData[key].price));
        }

        dispatch({type: SET_PRODUCTS,
        products: loadedProducts});
    }
};

export const deleteProduct = productId => {
    return {
        type: DELETE_PRODUCT,
        pid: productId
    };
}

export const createProduct = (title, description, imageUrl, price) => {

    return async dispatch => {

        const response = await fetch('https://udemy-education-project.firebaseio.com/products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price
            })
        });

        const responseData = await response.json();

        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                id: responseData.name,
                title: title,
                description: description,
                imageUrl: imageUrl,
                price: price
            }
        });
    }
}

export const updateProduct = (id, title, description, imageUrl) => {
    return {
        type: UPDATE_PRODUCT,
        pid: id,
        productData: {
            title: title,
            description: description,
            imageUrl: imageUrl
        }
    }
}