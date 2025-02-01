import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//Initial state of the productSlice
const initialState = {
    products: [],
    status: 'idle',
    error: null
}

//createAsyncThunk is used to create an action that performs an asynchronous operation.
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    return data.products;
})

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        //Reducer to update the product stock.
        updateProductStock: (state, action) => {
            const { id, stockChange } = action.payload;
            const product = state.products.find(item => item.id === id);
            if(product){
                product.stock += stockChange;
            }
        }
    },
    //extraReducers handles async actions such as fetching products.
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'success';
            state.products = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
})

export const { updateProductStock } = productSlice.actions;
export default productSlice.reducer;