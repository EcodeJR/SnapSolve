import { Link } from "react-router-dom";
const NotFound = () => {
    return ( 
        <section className="w-full h-screen bg-purpleMain text-whiteMain flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl md:text-6xl lg:text-9xl font-bold">404</h1>
            <p className="text-lg mb-5">YES, LOOKS LIKE YOUR LOST.....</p>
            <Link to='/' className="text-base md:text-lg lg:text-xl bg-yellowMain text-whiteMain uppercase px-6 py-2">back to safety</Link>
        </section>
     );
}
 
export default NotFound;