import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    status: 'idle',
    error: null
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    return data.products;
})

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        updateProductStock: (state, action) => {
            const { id, stockChange } = action.payload;
            const product = state.products.find(item => item.id === id);
            if(product){
                product.stock += stockChange;
            }
        }
    },
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