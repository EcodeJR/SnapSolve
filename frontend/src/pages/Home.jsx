import { MdDoubleArrow } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa6";
const Home = () => {
    return(
        <section className="w-full h-fit overflow-x-hidden text-blackMain">
            <div className="w-full h-screen flex items-center justify-center flex-col">
                <div className="relative py-3">
                    <p className="font-bold text-base bg-yellowMain rounded-full px-2 py-2 absolute -top-20 right-10 text-whiteMain w-24 text-center rotate-12">AI <FaLocationArrow className="text-xl w-9 font-bold absolute -top-3 -right-4" /></p>
                    <p className="font-bold text-base bg-orangeMain rounded-full px-2 py-2 absolute -bottom-20 left-10 text-whiteMain w-24 text-center rotate-12">LEARNING <FaLocationArrow className="text-xl font-bold absolute -top-3 -right-4" /></p>
                    <p className="font-bold text-base bg-petchMain rounded-full px-2 py-2 absolute -top-20 left-10 text-whiteMain w-24 text-center -rotate-12">AUTOMATE <FaLocationArrow className="text-xl font-bold absolute -top-3 -right-4" /></p>
                    <p className="font-bold text-base bg-blueMain rounded-full px-2 py-2 absolute -bottom-20 right-10 text-whiteMain w-24 text-center -rotate-12">GROWTH <FaLocationArrow className="text-xl font-bold absolute -top-3 -right-4" /></p>
                    <h1 className="font-bold text-4xl md:text-6xl lg:text-8xl font-[Rowdies] text-center">GET AI <span className="text-petchMain">SOLUTIONS</span> TO YOUR <span className="text-purpleMain">PROBLEMS</span></h1>
                </div>
                <p className="font-bold text-base md:text-lg lg:text-xl text-blackMain/85 font-mono text-center my-5">Learn and get solutions fast with snapsolve AI, <br /> and focus on other important problems.</p>
                <a href="#" className="text-xl font-bold py-3 px-6 rounded-full bg-purpleMain text-whiteMain uppercase flex items-center justify-center">Try Now <MdDoubleArrow className="mx-2" /></a>
            </div>
        </section>
    )
};

export default Home;