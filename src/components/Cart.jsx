import { useSelector } from "react-redux";
import CartDetailItem from "./CartDetailItem";

function Cart() {
    const {cartItems, totalPrice} = useSelector(state => state.cart);


    return(
        <div className="flex gap-4 m-4 p-4 flex-col">
            <p className="text-center text-2xl">Total Price: ${isNaN(totalPrice) ? 0 : totalPrice.toFixed(2)}</p>
            <div className="flex flex-row gap-8 flex-wrap justify-center items-center">
            {
                cartItems.length > 0 ? 
                cartItems.map((item) => (
                    <CartDetailItem key={item.id} image={item.images[0]} price={item.price} title={item.title} quantity={item.quantity} id={item.id}/>
                )) :
                <p>No items in cart.</p>
            }
            </div>
        </div>
    )
}

export default Cart;