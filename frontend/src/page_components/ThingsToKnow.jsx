import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import gem_icon from "../assets/gem_icon-nobg.png";
import gem_text from "../assets/gem_text2-nobg.png";
//others
import { NavLink } from "react-router-dom";
const ThingsToKnow = () => {
    return ( 
        <section id="about" className="py-4 px-2 text-center overflow-hidden">
            <h2 className="font-bold text-4xl md:text-4xl lg:text-6xl text-blackMain font-[Montserrat] text-center uppercase my-5">Things to know</h2>
            {/**/}
            <div className="flex flex-col items-center justify-center">

                <div className="p-3 flex w-[90%] md:w-[70%]">
                    <div className="flex flex-col items-center justify-between">
                        <div className="w-10 h-10 rounded-full border border-purpleMain flex items-center justify-center"><span className="w-3 h-3 rounded-full bg-purpleMain"></span></div>
                        <span className="w-1 h-[80%] md:h-[70%] bg-purpleMain rounded-full"></span>
                        
                    </div>
                    <div className="flex flex-col items-start justify-between mx-5 md:mx-10">
                        {/* <hr className="w-100 h-1 bg-purpleMain rotate-90 m-0" /> */}
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase">Image Recognition</h2>
                        <div className="px-2 mt-7">
                            <p className="text-justify text-base w-full">SnapSolve’s advanced image recognition captures any image with precision, allowing you to instantly convert visual data into workable text for seamless problem-solving.</p>
                        </div>
                    </div>
                </div>

                <div className="p-3 flex w-[90%] md:w-[70%]">
                    <div className="flex flex-col items-center justify-between">
                        <div className="w-10 h-10 rounded-full border border-purpleMain flex items-center justify-center"><span className="w-3 h-3 rounded-full bg-purpleMain"></span></div>
                        <span className="w-1 h-[80%] md:h-[70%] bg-purpleMain rounded-full"></span>
                        
                    </div>
                    <div className="flex flex-col items-start justify-between mx-5 md:mx-10">
                        {/* <hr className="w-100 h-1 bg-purpleMain rotate-90 m-0" /> */}
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase">Text Recognition</h2>
                        <div className="px-2 mt-7">
                            <p className="text-justify text-base w-full">Simply upload any document or note, and SnapSolve extracts the text instantly. Plus, you can chat with the AI for additional clarification!</p>
                        </div>
                    </div>
                </div>

                <div className="p-3 flex w-[90%] md:w-[70%]">
                    <div className="flex flex-col items-center justify-between">
                        <div className="w-10 h-10 rounded-full border border-purpleMain flex items-center justify-center"><span className="w-3 h-3 rounded-full bg-purpleMain"></span></div>
                        <span className="w-1 h-[80%] md:h-[70%] bg-purpleMain rounded-full"></span>
                        
                    </div>
                    <div className="flex flex-col items-start justify-between mx-5 md:mx-10">
                        {/* <hr className="w-100 h-1 bg-purpleMain rotate-90 m-0" /> */}
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase">Text Generation</h2>
                        <div className="px-2 mt-7">
                            <p className="text-justify text-base w-full">Have a question or need clarity on complex concepts? SnapSolve’s AI can generate clear explanations and answers tailored to your queries in seconds.</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="p-5 md:p-10 bg-purpleMain rounded-md shadow-2xl text-whiteMain w-full md:w-[70%] mx-auto my-5 relative overflow-hidden z-0">
                <img src={gem_icon} alt="Gemini AI logo" className="absolute -top-10 -right-10 w-24 md:w-40" />
                <div>
                    <h3 className="text-4xl md:text-6xl text-left font-normal mb-3 z-20">Supercharge Your <br /> Creativity & Productivity.</h3>
                </div>
                <div className="flex items-center justify-between mt-6">
                    <p className="text-left text-sm md:text-base font-light text-whiteMain/90">Unlock your potential—get inspired, solutions, create faster, and accomplish more with a tool that turns big ideas into reality, effortlessly!</p>
                    <span className="flex items-center justify-center">
                        <NavLink to="dashboard" className="font-light text-xl md:text-2xl">Try Now</NavLink>
                        <HiOutlineArrowNarrowRight className="text-2xl font-light mx-4" />
                    </span>
                    
                </div>
            </div>

            <h5 className="text-xl mt-4 md:mt-0 md:text-3xl uppercase font-bold flex flex-wrap items-center justify-center">Powered by <img src={gem_text} alt="Gemini AI" className="w-[50%] md:w-fit" /></h5>
        </section>
     );
}
 
export default ThingsToKnow;