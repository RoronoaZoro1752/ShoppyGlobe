import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../app/features/productSlice'; //Import the product Slice reducer.
import cartReducer from '../app/features/cartSlice'; //Import the cart Slice reducer.

//configure and create the Redux store.
export default configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer
    }
})