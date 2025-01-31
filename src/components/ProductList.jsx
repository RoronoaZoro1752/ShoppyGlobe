/* eslint-disable react/prop-types */
function ProductList({image, title, price}) {

    return(
        <div className=" bg-slate-300 flex flex-col justify-center items-center w-64 h-80 rounded-3xl transition hover:scale-105 duration-200 cursor-pointer">
            <img src={image} alt="" 
                className="h-52 bg-transparent"
            />
            <p className="px-4 py-2 text-center">{title}</p>
            <p className="px-4 text-center">Price:${price} </p>
            
        </div>
    )
}

export default ProductList;