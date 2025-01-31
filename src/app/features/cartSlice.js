import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    cartItems: [], 
    totalPrice: 0
}

const cartSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newProduct = action.payload;
            const existingItem = state.cartItems.find(item => item.id == newProduct.id);

            if(existingItem){
                existingItem.quantity += 1;
            }
            else{
                state.cartItems.push({...newProduct, quantity: 1});
            }

            state.totalPrice = state.cartItems.reduce((total, item) => total + item.quantity * item.price, 0)
        },
        removeFromCart: (state, action) => {
            const productId = action.payload.id;
            state.cartItems = state.cartItems.filter((item) => item.id !== productId);
            state.totalPrice = state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
        },
        decrease: (state, action) => {
            const productId = action.payload.id;
            const existingItem = state.cartItems.find(item => item.id == productId);

            if(existingItem.quantity > 1){
                existingItem.quantity -= 1;
            }else{
                state.cartItems = state.cartItems.filter((item) => item.id !== productId);
            }
            state.totalPrice = state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
        }
    }
})

export const { addToCart, removeFromCart, decrease } = cartSlice.actions;
export default cartSlice.reducer;