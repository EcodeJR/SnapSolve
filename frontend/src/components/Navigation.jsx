import { useState, useRef, useLayoutEffect } from 'react';
import logo from '../assets/snapsolveLogo.png';
import gsap from 'gsap';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie'; 

const Navigation = () => {
    const logoAni = useRef(null);
    const linkAni = useRef(null);
    const linkAni1 = useRef(null);
    const linkAni2 = useRef(null);
    // const btnAni = useRef(null);
    const mobileMenuRef = useRef(null);

    const [username, setUsername] = useState("");

    const [smallscreen, setSmallscreen] = useState(false);

    useLayoutEffect(() => {
        const elements = [linkAni.current, linkAni1.current, linkAni2.current];

        const user = Cookies.get('username');
        setUsername(user);
        gsap.fromTo(logoAni.current, 
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 1 }
        );

        elements.forEach(element => {
            gsap.fromTo(element, 
                { y: -50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 }
            );
        });

        return () => {
            gsap.killTweensOf([logoAni.current, ...elements]);
        };
    }, []);

        const handleSmoothScroll = (e, targetId) => {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu if open
        if (smallscreen) {
            toggleNav();
        }
    };

    const Links = [
        {id: 1, name: 'How it works', value: '#howitworks', AniRef: linkAni},
        {id: 2, name: 'About', value: '#about', AniRef: linkAni1},
        {id: 3, name: 'Contact', value: '#contact', AniRef: linkAni2}
    ];

    const toggleNav = () => {
        setSmallscreen(!smallscreen);
        if (!smallscreen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    };

    return (
        <nav className='fixed top-0 left-0 right-0 z-50'>
            <div className='backdrop-blur-md bg-transparent px-6 py-4'>
                <div className='max-w-7xl mx-auto flex items-center justify-between'>
                    <div className='flex items-center space-x-2' ref={logoAni}>
                        <img src={logo} alt="Snapsolve's Logo" className='w-10 h-10' />
                        <NavLink to='/' className='text-2xl font-bold text-black'>
                            SnapSolve
                        </NavLink>
                    </div>
                    
                    {/* Desktop Menu */}
                    <ul className='hidden md:flex items-center space-x-8'>
                        {Links.map(link => (
                            <li key={link.id} ref={link.AniRef}>
                                <a 
                                    href={link.value} 
                                    onClick={(e) => handleSmoothScroll(e, link.value)}
                                    className="relative text-black/80 hover:text-black transition-all duration-300 hover:scale-105 transform
                                        before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-full before:h-0.5 
                                        before:bg-black before:transform before:scale-x-0 before:transition-transform before:duration-300
                                        hover:before:scale-x-100"
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                        <div className='flex items-center space-x-4'>
                            {username ? (
                        <>
                            <span className="text-black/70 text-sm uppercase">
                                Hello, {username}
                            </span>
                            <NavLink 
                                to="/dashboard" 
                                className="px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg
                                    bg-black text-white hover:bg-black/90"
                            >
                                Dashboard
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink 
                                to="/signin" 
                                className="text-black/80 hover:text-black transition-all duration-300 hover:scale-105"
                            >
                                Sign in
                            </NavLink>
                            <NavLink 
                                to="/signup" 
                                className="px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg
                                    bg-black text-white hover:bg-black/90"
                            >
                                Sign up
                            </NavLink>
                        </>
                    )}
                        </div>
                    </ul>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={toggleNav} 
                        className='md:hidden p-2 rounded-lg hover:bg-black/5 transition-colors duration-300'
                        aria-label="Toggle mobile menu"
                    >
                        <svg 
                            className={`w-6 h-6 transition-transform duration-300 ${smallscreen ? 'rotate-90' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d={smallscreen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                            />
                        </svg>
                        </button>
                </div>
            </div>

            {/* Mobile Menu Content */}
            <div 
                ref={mobileMenuRef}
                className={`fixed top-[72px] left-0 right-0 bottom-0 bg-white transform transition-transform duration-300 ease-in-out md:hidden ${
                    smallscreen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <ul className='flex flex-col items-center justify-start pt-8 space-y-8'>
                    {Links.map(link => (
                        <li key={link.id} className='w-full text-center'>
                            <a 
                                onClick={(e) => handleSmoothScroll(e, link.value)}
                                href={link.value}
                                className="text-xl font-medium transition-colors duration-300 text-black/80 hover:text-black hover:bg-black/5 block py-3"
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                    <div className='flex flex-col items-center space-y-4 w-full px-8 pt-4'>
                        {username ? (
                            <>
                                <span className="text-black/70 text-sm uppercase">
                                    Hello, {username}
                                </span>
                                <NavLink 
                                    onClick={toggleNav}
                                    to="/dashboard" 
                                    className="w-full py-3 text-center bg-black text-white hover:bg-black/90 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg"
                                >
                                    Dashboard
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink 
                                    onClick={toggleNav}
                                    to="/signin" 
                                    className="text-black/80 hover:text-black transition-all duration-300"
                                >
                                    Sign in
                                </NavLink>
                                <NavLink 
                                    onClick={toggleNav}
                                    to="/signup" 
                                    className="w-full py-3 text-center bg-black text-white hover:bg-black/90 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg"
                                >
                                    Sign up
                                </NavLink>
                            </>
                        )};
                    </div>
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;