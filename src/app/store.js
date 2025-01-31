import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../app/features/productSlice';
import cartReducer from '../app/features/cartSlice';

export default configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer
    }
})