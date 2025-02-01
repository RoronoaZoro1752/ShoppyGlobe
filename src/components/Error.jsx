import { Link } from "react-router-dom";

function Error(){
    //Error message will be displayed when the user tries to access the invalid route.
    return(
        <div className="flex flex-col items-center justify-center h-screen px-4 sm:px-8 text-center gap-6">
            <p className="text-lg sm:text-xl md:text-2xl">
                The page you are trying to view is not available...
            </p>
            <Link to="/">
            <button className="text-slate-700 cursor-pointer hover:underline text-base sm:text-lg">
                 Back to main page
            </button>
            </Link>
        </div>
    )
}

export default Error;