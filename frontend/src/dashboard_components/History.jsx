import { Link } from "react-router-dom";
const History = () => {
    return ( 
        <div className="flex flex-col items-center justify-start w-full h-full">
            <Link to='/' className="font-bold text-3xl md:text-4xl lg:text-5xl">SnapSolve</Link>
            <div className="flex flex-col items-center justify-start my-5">
                <h4 className="text-center text-xl md:text-2xl lg:text-3xl">Chat History</h4>
                <div className="flex flex-col items-center justify-center">
                    <div>Coming Soon!!</div>
                </div>
            </div>
        </div>
     );
}
 
export default History;