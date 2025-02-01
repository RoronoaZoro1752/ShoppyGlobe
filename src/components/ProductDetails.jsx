import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { addToCart } from "../app/features/cartSlice"; //Import action to add the item to the cart.
import { updateProductStock } from "../app/features/productSlice"; //Import the action to update the stocks in the products Slice.

function ProductDetails(){
    let {id} = useParams(); //Get the product Id from the url.
    let {products} = useSelector((state) => state.product);  //Access products from the Redux store.
    let dispatch = useDispatch();
    
    //Find the product that matches the ID from the url.
    let indiProduct = products.find((product) => (
        product.id == parseInt(id)
    ))

    //Function to handle adding the product to the cart and updating the stocks of the products.
    function handleAddtoCart(){
        if(indiProduct.stock > 0){
            dispatch(addToCart(indiProduct))
            setTimeout(() => {
                dispatch(updateProductStock({id: indiProduct.id, stockChange: -1}))
            }, 100);
        }
    }

    return(
        //Product details card.
        <div className="flex items-center justify-center mt-8">
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-center items-center w-96 border border-gray-200">
            <img src={indiProduct.images[0]} alt={indiProduct.title} className="h-48  object-cover rounded-md mb-4"/>
            <h2 className="text-lg font-semibold text-gray-800 text-center">{indiProduct.title}</h2>
    
            <p className="text-gray-600 text-sm text-center">{indiProduct.description}</p>
    
            <div className="flex items-center gap-2 mt-2">
                <span className="text-yellow-500 text-lg">⭐ {indiProduct.rating}</span>
            </div>
    
            <p className="text-xl font-bold text-black mt-2">${indiProduct.price}</p>
    
            <p className="text-gray-500 text-sm">Stocks Left: <span className="font-semibold">{indiProduct.stock}</span></p>

            { indiProduct.stock > 0 ?
                <button className="mt-4 bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all cursor-pointer"
                onClick={handleAddtoCart}
            >
                Add to Cart
            </button> :
                <p className="text-red-500">Currently Out of stock</p>
            }
            <Link to='/'>
                <button className="mt-4 cursor-pointer hover:underline">Back</button>
            </Link>
        </div>
        </div>
    )
}

export default ProductDetails;