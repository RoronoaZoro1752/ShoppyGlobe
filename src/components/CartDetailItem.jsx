import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrease, removeFromCart } from "../app/features/cartSlice";
import { updateProductStock } from "../app/features/productSlice";

/* eslint-disable react/prop-types */
function CartDetailItem({ image, title, price, quantity, id}) {

    let dispatch = useDispatch();
    let {products} = useSelector((state) => state.product);

    let indiProduct = products.find((product) => (
        product.id == parseInt(id)
    ))

    function handleAddtoCart() {
        if(indiProduct && indiProduct.stock > 0){
            dispatch(addToCart(indiProduct));
            setTimeout(() => {
                dispatch(updateProductStock({id: indiProduct.id, stockChange: -1}))
            }, 100);
        }
    }

    function handleDecrease() {
        if(indiProduct && quantity > 1){
            dispatch(decrease(indiProduct));
            setTimeout(() => {
                dispatch(updateProductStock({id: indiProduct.id, stockChange: 1}));
            }, 100)
        }
    }

    function handleRemoveFromCart() {
        if(indiProduct){
            dispatch(removeFromCart(indiProduct));
            setTimeout(() => {
                dispatch(updateProductStock({id: indiProduct.id, stockChange: quantity}));
            }, 100)
        }
    }

    return(
    <div className="bg-slate-300 flex flex-col justify-between items-center w-64 h-96 rounded-3xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <img src={image} alt={title} className="h-40 w-auto object-contain bg-transparent" />

        <p className="px-4 py-1 text-lg font-semibold text-center text-gray-800">{title}</p>
        <p className="px-4 text-md text-gray-700">Price: <span className="font-bold text-black">${price}</span></p>

        <div className="flex items-center justify-center gap-2">
            <button
                className="text-slate-700 cursor-pointer text-xl"
                onClick={handleAddtoCart}
            >
                +
            </button>
            <p className="font-semibold text-lg">{quantity}</p>
            <button
                className="text-slate-700 cursor-pointer text-xl"
                onClick={handleDecrease}
            >
                -
            </button>
        </div>

        <button
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            onClick={handleRemoveFromCart}
        >
            Delete Item
        </button>
    </div>

    )
}

export default CartDetailItem;