import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
    let cartNoItems = useSelector(state => state.cart.cartItems)
    return(
        <div className="flex items-center justify-between px-6 md:px-20 lg:px-40 xl:px-60 bg-slate-300 py-4">
            <p className="font-semibold text-xl md:text-2xl">ShoppyGlobe</p>
            <div className="flex gap-6 md:gap-12">
                <Link to="/" className="text-sm md:text-base">Home</Link>
                <Link to="/cart" className="text-sm md:text-base">
                    Cart: {cartNoItems.length}
                </Link>
            </div>
        </div>
    )
}

export default Header;