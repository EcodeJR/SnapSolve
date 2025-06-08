import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import gem_icon from "../assets/gem_icon-nobg.png";
import gem_text from "../assets/gem_text2-nobg.png";
import { NavLink } from "react-router-dom";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useEffect, useRef } from "react";

// gsap.registerPlugin(ScrollTrigger);

const ThingsToKnow = () => {
    // const timelineRefs = useRef([]);
    // const headingRef = useRef(null);
    // const ctaRef = useRef(null);
    // const poweredByRef = useRef(null);

    // useEffect(() => {
    //     const ctx = gsap.context(() => {
    //         // Animate heading
    //         gsap.from(headingRef.current, {
    //             scrollTrigger: {
    //                 trigger: headingRef.current,
    //                 start: "top 80%",
    //                 toggleActions: "play none none reverse"
    //             },
    //             opacity: 0,
    //             y: 30,
    //             duration: 0.8
    //         });

    //         // Animate timeline items
    //         timelineRefs.current.forEach((item, index) => {
    //             gsap.from(item, {
    //                 scrollTrigger: {
    //                     trigger: item,
    //                     start: "top 80%",
    //                     toggleActions: "play none none reverse"
    //                 },
    //                 opacity: 0,
    //                 x: -50,
    //                 duration: 0.8,
    //                 delay: index * 0.2
    //             });
    //         });

    //         // Animate CTA section
    //         gsap.from(ctaRef.current, {
    //             scrollTrigger: {
    //                 trigger: ctaRef.current,
    //                 start: "top 80%",
    //                 toggleActions: "play none none reverse"
    //             },
    //             opacity: 0,
    //             scale: 0.95,
    //             duration: 1
    //         });

    //         // Animate powered by section
    //         gsap.from(poweredByRef.current, {
    //             scrollTrigger: {
    //                 trigger: poweredByRef.current,
    //                 start: "top 90%",
    //                 toggleActions: "play none none reverse"
    //             },
    //             opacity: 0,
    //             y: 20,
    //             duration: 0.8
    //         });
    //     });

    //     return () => ctx.revert();
    // }, []);

    // ...rest of your existing code...

        <section className="py-20 px-4 md:px-8 text-center overflow-hidden bg-gradient-to-b from-white to-purple-50">
             <h2  className="font-bold text-4xl md:text-5xl lg:text-6xl text-blackMain font-[Montserrat] text-center mb-16">{/* ref={headingRef} */}
                Things to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purpleMain to-petchMain">Know</span>
            </h2>

            {/* ...existing timeline features code... */}

            <div  className="glass-effect p-10 rounded-2xl shadow-2xl text-whiteMain w-full md:w-[80%] mx-auto my-16 relative overflow-hidden bg-gradient-to-r from-purpleMain to-petchMain">{/* ref={ctaRef} */}
                {/* ...existing CTA content... */}
            </div>

            <div  className="flex flex-col md:flex-row items-center justify-center gap-4 mt-16">{/* ref={poweredByRef} */}
                {/* ...existing powered by content... */}
            </div>
        </section>


    const features = [
    {
        title: "Versatile Learning Tools",
        description: "Access multiple AI-powered tools in one place: Chat for quick answers, Analysis for text improvement, Study Guide for comprehensive learning, and Image recognition for visual problems."
    },
    {
        title: "Intelligent Text Processing",
        description: "Whether you're writing essays, solving math problems, or studying complex topics, our AI provides detailed analysis, suggestions, and explanations tailored to your needs."
    },
    {
        title: "Comprehensive Study Support",
        description: "Generate complete study guides with key points, resources, and practice questions. Perfect for exam preparation or deep diving into any subject matter."
    }
];

    return ( 
        <section id="about" className="py-20 px-4 md:px-8 text-center overflow-hidden bg-gradient-to-b from-white to-purple-50">
            <h2  className="font-bold text-4xl md:text-5xl lg:text-6xl text-blackMain font-[Montserrat] text-center mb-16">{/* ref={headingRef} */}
                Things to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purpleMain to-petchMain">Know</span>
            </h2>

            <div  className="glass-effect p-5 lg:p-10 rounded-2xl shadow-2xl text-whiteMain w-full md:w-[80%] mx-auto my-16 relative overflow-hidden bg-gradient-to-r from-purpleMain to-petchMain">{/* ref={ctaRef} */}
                {features.map((feature, index) => (
                    <div 
                        key={index}
                        
                        className="p-2 lg:p-6 flex w-full md:w-[80%] mb-12"
                    >{/*ref={el => timelineRefs.current[index] = el}  **/}
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full border-2 border-purpleMain flex items-center justify-center bg-white shadow-lg">
                                <span className="w-4 h-4 rounded-full bg-purpleMain"></span>
                            </div>
                            {index !== features.length - 1 && (
                                <span className="w-0.5 h-24 bg-gradient-to-b from-purpleMain to-transparent rounded-full my-2"></span>
                            )}
                        </div>
                        <div className="flex flex-col items-start justify-between ml-2 lg:ml-8">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purpleMain to-petchMain bg-clip-text text-transparent">
                                {feature.title}
                            </h2>
                            <div className="mt-4">
                                <p className="text-justify lg:text-left text-lg text-blackMain/70 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

<div  className="glass-effect p-10 rounded-2xl shadow-2xl w-full md:w-[80%] mx-auto my-16 relative overflow-hidden">{/** ref={ctaRef}*/}
    {/* Primary gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-purpleMain via-[#4830C0] to-[#7248FF]"></div>
    
    {/* Secondary gradient for depth */}
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10"></div>
    
    {/* Animated glow effect */}
    <div className="absolute -inset-[100px] bg-gradient-conic from-purple-600/40 via-blue-500/40 to-purple-600/40 blur-3xl opacity-30 animate-slow-spin"></div>
    
    <img 
        src={gem_icon} 
        alt="Gemini AI logo" 
        className="absolute -top-12 -right-12 w-32 md:w-48 opacity-20 z-10 mix-blend-luminosity animate-pulse" 
    />
    
    <div className="relative z-20">
        <h3 className="text-4xl md:text-6xl text-left font-bold mb-6 leading-tight">
            <span className="text-white drop-shadow-lg">Transform How You</span> <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                Learn & Understand
            </span>
        </h3>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mt-6">
            <p className="text-left text-lg font-light text-white/95 max-w-2xl">
                Experience the future of learning with our comprehensive AI toolkit. From instant problem-solving to in-depth study guides, SnapSolve empowers you to learn more effectively and efficiently than ever before.
            </p>
            <NavLink 
                to="dashboard" 
                className="flex items-center gap-2 bg-white hover:bg-opacity-90 text-purpleMain px-8 py-4 rounded-xl transition-all duration-300 group shadow-lg hover:shadow-xl"
            >
                <span className="font-medium text-xl">Try Now</span>
                <HiOutlineArrowNarrowRight className="text-2xl group-hover:translate-x-2 transition-transform duration-300" />
            </NavLink>
        </div>
    </div>
</div>

            <div  className="flex flex-col md:flex-row items-center justify-center gap-4 mt-10">{/**ref={poweredByRef} */}
                <h5 className="text-2xl md:text-3xl font-bold text-blackMain/80">Powered by</h5>
                <img src={gem_text} alt="Gemini AI" className="h-16 md:h-20 object-contain" />
            </div>
        </section>
    );
}

export default ThingsToKnow;