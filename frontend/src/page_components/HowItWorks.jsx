// import { useEffect, useRef } from "react";
import Man_upload from "../assets/man_upload.jpeg"
import Upload_ui from "../assets/upload_ui.jpeg"
import Ai_ui from "../assets/ai_ui.jpeg"
//icons
import { FaRegEye } from "react-icons/fa";
import { TiMessageTyping } from "react-icons/ti";
import { RiAiGenerate } from "react-icons/ri";
import { SiTeamspeak } from "react-icons/si";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavLink } from "react-router-dom";

// gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
    // const headingRef = useRef(null);
    // const cardsRef = useRef([]);
    // const contentRef = useRef(null);
    // const featuresRef = useRef(null);

    // useEffect(() => {
    //         // Initialize feature cards array
    //         gsap.set(featuresRef.current.children, {
    //             opacity: 1 // Ensure elements are visible by default
    //         });
    //         const ctx = gsap.context(() => {
    //         // Animate heading
    //         gsap.from(headingRef.current, {
    //             scrollTrigger: {
    //                 trigger: headingRef.current,
    //                 start: "top 80%",
    //                 toggleActions: "play none none reverse"
    //             },
    //             opacity: 0,
    //             y: 50,
    //             duration: 1
    //         });

    //         // Animate cards
    //         cardsRef.current.forEach((card, index) => {
    //             gsap.from(card, {
    //                 scrollTrigger: {
    //                     trigger: card,
    //                     start: "top 80%",
    //                     toggleActions: "play none none reverse"
    //                 },
    //                 opacity: 0,
    //                 y: 50,
    //                 duration: 1,
    //                 delay: index * 0.2
    //             });
    //         });

    //         // Animate content section
    //         gsap.from(contentRef.current, {
    //             scrollTrigger: {
    //                 trigger: contentRef.current,
    //                 start: "top 70%",
    //                 toggleActions: "play none none reverse"
    //             },
    //             opacity: 0,
    //             x: -50,
    //             duration: 1
    //         });

    //         // Animate features
    //         gsap.from(featuresRef.current.children, {
    //             scrollTrigger: {
    //                 trigger: featuresRef.current,
    //                 start: "top 80%",
    //                 toggleActions: "play none none reverse"
    //             },
    //             y: 50,
    //             opacity: 0,
    //             duration: 0.5,
    //             stagger: 0.1,
    //             ease: "power2.out"
    //         });
    //     });

    //     return () => ctx.revert(); // Cleanup
    // }, []);

    return (
        <section id="howitworks" className='relative w-full min-h-screen py-20 px-4 md:px-8 overflow-hidden'>
            <h2  className='font-bold text-4xl md:text-5xl lg:text-6xl text-blackMain font-[Montserrat] text-center mb-16'>{/* ref={headingRef} */}
                How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-purpleMain to-petchMain">Works</span>
            </h2>

            <div className='w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-20'>
                {[
    { 
        img: Man_upload, 
        title: "Multiple Input Methods", 
        desc: "Upload images, paste text, or type your questions - SnapSolve handles it all with ease." 
    },
    { 
        img: Upload_ui, 
        title: "Choose Your Tool", 
        desc: "Select from Chat, Analysis, Study Guide, or Image recognition tools based on your needs." 
    },
    { 
        img: Ai_ui, 
        title: "Get Comprehensive Solutions", 
        desc: "Receive detailed explanations, study guides, text analysis, and more powered by advanced AI." 
    }
].map((item, index) => (
                    <div
                        key={index}
                        
                        className='glass-effect p-6 rounded-2xl hover:shadow-2xl transition-all duration-300'
                    >{ /*ref={el => cardsRef.current[index] = el}*/}
                        <img src={item.img} className="w-full h-48 object-cover rounded-xl mb-6" alt={item.title} />
                        <h3 className='font-bold text-2xl text-blackMain mb-3'>{item.title}</h3>
                        <p className="text-blackMain/70 text-base leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                <div  className="flex-1 space-y-6">{/* ref={contentRef} */}
                    <h4 className="font-bold text-5xl lg:text-6xl xl:text-7xl leading-tight">
                        Effortlessly Solve <br /> 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purpleMain to-petchMain">
                            Challenges
                        </span> <br />
                        With SnapSolve.
                    </h4>
                    <p className="text-lg text-blackMain/70 leading-relaxed">
                        No more struggling with complex problems. Upload an image, and our AI delivers instant solutions. Simple, fast, and accurate.
                    </p>
                    <NavLink 
                        to="dashboard" 
                        className="inline-block bg-gradient-to-br from-purpleMain via-[#4830C0] to-[#7248FF] text-whiteMain py-4 px-8 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                        TRY FOR FREE
                    </NavLink>
                </div>

<div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-12"> {/* Changed items-center to items-start */}
    {/* ... content section ... */}

    <div  className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full relative z-10"> {/* Added relative and z-10 ref={featuresRef}*/}
        {[
    { 
        icon: FaRegEye, 
        title: "Smart Recognition", 
        desc: "From math problems to complex text, our AI understands and processes various types of content." 
    },
    { 
        icon: TiMessageTyping, 
        title: "Advanced Analysis", 
        desc: "Get grammar checks, writing improvements, and detailed text analysis." 
    },
    { 
        icon: RiAiGenerate, 
        title: "Study Guide Generator", 
        desc: "Transform any topic into comprehensive study materials with practice questions." 
    },
    { 
        icon: SiTeamspeak, 
        title: "Interactive Learning", 
        desc: "Engage in natural conversations with AI for deeper understanding." 
    }
].map((item, index) => (
            <div
                key={index}
                className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
                <item.icon className="text-4xl text-purpleMain mb-4" />
                <h5 className="font-bold text-xl mb-2">{item.title}</h5>
                <p className="text-blackMain/70">{item.desc}</p>
            </div>
        ))}
    </div>
</div>
            </div>
        </section> 
    );
};

export default HowItWorks;