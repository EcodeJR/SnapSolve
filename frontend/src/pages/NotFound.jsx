import { Link } from "react-router-dom";
import Tom from '../assets/Tom.png';
const NotFound = () => {
    return ( 
        <section className="w-full h-screen bg-purpleMain text-whiteMain flex flex-col md:flex-row items-center justify-center text-center">
            <img src={Tom} alt="Snapsolves's Logo." draggable="true" className='w-[40px] md:w-[200px] lg:w-[300px]' />
            <div>
                <h1 className="text-4xl md:text-6xl lg:text-9xl font-light">404</h1>
            <p className="text-lg font-bold mb-5">LOOKS LIKE {`YOU'RE`} LOST.....</p>
            <Link to='/' className="text-base md:text-lg lg:text-xl bg-yellowMain text-whiteMain uppercase px-6 py-2 shadow-2xl rounded">back to safety</Link>
            </div>
            
        </section>
     );
}
 
export default NotFound;