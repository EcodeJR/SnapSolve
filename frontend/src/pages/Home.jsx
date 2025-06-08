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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    

    return(
        <section className="w-full min-h-screen overflow-x-hidden text-blackMain">
        <Navigation />
        <div className="w-full min-h-screen py-5 flex items-center justify-center flex-col relative">
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-purpleMain/40 rounded-full mix-blend-multiply filter blur-[64px] animate-blob"></div>
                <div className="absolute top-[30%] right-[15%] w-96 h-96 bg-yellowMain/40 rounded-full mix-blend-multiply filter blur-[64px] animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[20%] left-[30%] w-96 h-96 bg-petchMain/40 rounded-full mix-blend-multiply filter blur-[64px] animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative my-6 mx-3 py-2 lg:my-0 mt-0 lg:mt-14 lg:py-3 z-10">
                <div className="glass-effect absolute -top-10 right-10 lg:-top-10 lg:right-10 px-4 py-2 rounded-xl rotate-12 animate-float backdrop-blur-md bg-whiteMain/30 border border-whiteMain/50">
                    <span className="font-bold text-xs lg:text-base text-purpleMain">AI POWERED</span>
                </div>
                <div className="glass-effect absolute -top-10 left-10 lg:-top-10 lg:left-10 px-4 py-2 rounded-xl rotate-12 animate-float backdrop-blur-md bg-whiteMain/30 border border-whiteMain/50">
                    <span className="font-bold text-xs lg:text-base text-petchMain">AI SOLUTIONS</span>
                </div>

                <h1 className="font-bold text-4xl md:text-5xl lg:text-7xl font-[Montserrat] text-center" ref={heroText}>
                    Your Complete <span className="text-transparent bg-clip-text bg-gradient-to-r from-purpleMain to-petchMain">AI-Powered</span> Learning Assistant for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purpleMain via-[#4830C0] to-[#7248FF]">Every Challenge!</span>
                </h1>
            </div>

                <p className="font-medium text-base md:text-lg lg:text-xl text-blackMain/85 font-[Montserrat Alternates] text-center mx-12 lg:mt-0 lg:my-5 z-10">
                    From text analysis to study guides, image recognition to instant answers - SnapSolve AI is your all-in-one learning companion that helps you learn smarter, not harder.
                </p>

                <NavLink to="/dashboard" className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium transition duration-300 ease-out border-2 border-black rounded-lg shadow-md group z-10 my-6">
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-black group-hover:translate-x-0 ease">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">Try For Free</span>
                    <span className="relative invisible">Try For Free</span>
                </NavLink>
        </div>
            
            {/* Update other sections with glass-morphism and gradients */}
            <HowItWorks />
            <ThingsToKnow />
            <GetInTouch />
            <Footer />
        </section>
    )
};

export default Home;