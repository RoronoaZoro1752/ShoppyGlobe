import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './productSlice';
import { useEffect, useState } from 'react';
import ProductList from '../../components/ProductList';
import { Link, useParams } from 'react-router-dom';

function Product(){
    const {id} = useParams();
    const dispatch = useDispatch();
    const { products, status, error } = useSelector((state) => state.product);
    const [productName, setProductName] = useState("");
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        if(products.length === 0){
            dispatch(fetchProducts())
        }
    }, [dispatch, products])
    
    useEffect(() => {
        if(!productName){
            setFiltered(products);
        }else{
            setFiltered(
                products.filter((product) => (
                    product.title.toLowerCase().includes(productName.toLowerCase()) ||
                    product.tags.some((tag) => tag.toLowerCase().includes(productName.toLowerCase()))
                ))
            )
        }
    }, [products, productName])
    
    return(
        <div className='p-4 md:p-8'>
            <div className="flex flex-col sm:flex-row justify-center items-center pb-4 gap-4">
                <input
                     type="text"
                     className="border border-gray-400 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-80"
                     placeholder="Search for an item"
                     onChange={(e) => setProductName(e.target.value)}
                />
                
            </div>

            <div className='flex flex-row gap-8 flex-wrap justify-center items-center'>
            
            {status == 'loading' && <p className='text-center'>Loading...</p>}
            {status == 'failed' && <p className='text-center'>Error: {error}</p>}
           
            {
                status == 'success' && 
                filtered.map((product) => (
                   <Link to={`/product/${product.id}`} key={id}><ProductList key={product.id} image={product.images[0]} title={product.title} price={product.price}/></Link> 
                ))
                
            }
            {status == 'success' && filtered.length == 0 && <p className='text-center'>Product not found.... Search for something else</p>}
            </div>
        </div>
    )
}

export default Product;