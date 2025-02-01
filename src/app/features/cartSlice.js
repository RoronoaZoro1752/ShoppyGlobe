import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    cartItems: [], 
    totalPrice: 0
}

//This is the cartSlice which will have a cartItems(empty array) and totalPrice(an integer with value 0) as its initial state.

const cartSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        //Reducer to add an item to the cart.
        addToCart: (state, action) => {
            
            const newProduct = action.payload;
            const existingItem = state.cartItems.find(item => item.id == newProduct.id);

            if(existingItem){
                //If the item already exists in the cart, increase its quantity by 1.
                existingItem.quantity += 1;
            }
            else{
                //If the item is not in the cart, add it with a quantity of 1.
                state.cartItems.push({...newProduct, quantity: 1});
            }
            //Recalculate the total price after adding the item.
            state.totalPrice = state.cartItems.reduce((total, item) => total + item.quantity * item.price, 0)
        },

        //Reducer to remove an item from the cart.
        removeFromCart: (state, action) => {
            const productId = action.payload.id;
            state.cartItems = state.cartItems.filter((item) => item.id !== productId);
            state.totalPrice = state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
        },

        //Reducer to decrease the quantity of an item in the cart.
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