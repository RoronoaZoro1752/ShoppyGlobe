function Loading(){
    return(
        //This is a loading container used for lazy loading. When the network is slow or the component takes some time to 
        //load, this component is displayed.
        <div className="flex items-center justify-center h-screen px-4 sm:px-8">
            <p className="text-center text-lg sm:text-xl md:text-2xl">Loading...</p>
        </div>
    )
}

export default Loading;