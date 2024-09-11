// import { FaLocationArrow } from "react-icons/fa6";
import gsap from "gsap";
// import { SplitText } from "gsap/SplitText";
import { useRef, useEffect } from "react";
import Navigation from '../components/Navigation';

import HowItWorks from "../page_components/HowItWorks";
import ThingsToKnow from "../page_components/ThingsToKnow";
import GetInTouch from "../page_components/GetInTouch";
import Footer from "../components/Footer";

//others
import { NavLink } from "react-router-dom";

// gsap.registerPlugin(SplitText);
const Home = () => {
    let heroText = useRef(null);
    // let MySplitText = new SplitText(heroText, {type: 'chars'});
    // let chars = MySplitText.chars;

    useEffect(() => {
        gsap.from(heroText, {
            yPercent: 130,
            stagger:0.02,
            ease: 'back.out',
            duration: 1
        });

    }, [])
    
    return(
        <section className="w-full h-fit overflow-x-hidden text-blackMain">
            <Navigation />
            <div className="w-full h-fit py-5 lg:h-screen flex items-center justify-center flex-col">
                <div className="relative my-12 py-2 lg:my-0 lg:py-3">
                    <p className="font-bold text-xs lg:text-base bg-yellowMain rounded-full px-2 py-2 absolute -top-10 right-10 lg:-top-20 lg:right-10 text-whiteMain w-28 text-center rotate-12">AI</p>
                    <p className="font-bold text-xs lg:text-base bg-orangeMain rounded-full px-2 py-2 absolute -bottom-10 left-5 lg:-bottom-20 lg:left-10 text-whiteMain w-28 text-center rotate-12">LEARNING</p>
                    <p className="font-bold text-xs lg:text-base bg-petchMain rounded-full px-2 py-2 absolute -top-10 left-10 lg:-top-20 lg:left-10 text-whiteMain w-28 text-center -rotate-12">AUTOMATE</p>
                    <p className="font-bold text-xs lg:text-base bg-blueMain rounded-full px-2 py-2 absolute -bottom-10 right-5 lg:-bottom-20 lg:right-10 text-whiteMain w-28 text-center -rotate-12">GROWTH</p>
                    <h1 className="font-bold text-4xl md:text-6xl lg:text-8xl font-[Montserrat] text-center" ref={heroText}>GET AI <span className="text-petchMain">SOLUTIONS</span> TO YOUR <span className="text-purpleMain">PROBLEMS</span></h1>
                </div>
                <p className="font-medium text-base md:text-lg lg:text-xl text-blackMain/85 font-[Montserrat Alternates] text-center mt-10 lg:mt-0 lg:my-5">Learn and get solutions fast with snapsolve AI, <br /> and focus on other important problems.</p>
                <NavLink to="/dashboard" className="text-xl font-semibold my-2 py-3 px-10 hover:shadow-2xl bg-purpleMain text-whiteMain rounded flex items-center justify-center uppercase">Try For Free</NavLink>
            </div>
            <HowItWorks />
            <ThingsToKnow />
            <GetInTouch />
            <Footer />
        </section>
    )
};

export default Home;