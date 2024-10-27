import { useState, useRef, useLayoutEffect } from 'react';
import logo from '../assets/snapsolveLogo.png';
import gsap from 'gsap';
import { NavLink } from 'react-router-dom';
// let links = ['Services', 'Benefits', 'Networks'];

const Navigation = () => {

    const logoAni = useRef(null);
    const linkAni = useRef(null);
    const linkAni1 = useRef(null);
    const linkAni2 = useRef(null);
    const btnAni = useRef(null);
    const smallMenu = useRef(null);
    const smallNav = useRef(null);

    useLayoutEffect(() => {
        const elements = [linkAni.current, linkAni1.current, linkAni2.current];

        gsap.fromTo(logoAni.current, 
            { x: -100, opacity: 0 }, // from values
            { x: 0, opacity: 1, duration: 1 } // to values
        );

        gsap.fromTo(btnAni.current, 
            { x: 100, opacity: 0 }, // from values
            { x: 0, opacity: 1, duration: 2 } // to values
        );

        elements.forEach(element => {
            gsap.fromTo(element, 
                { y: -100, opacity: 0 }, // from values
                { y: 0, opacity: 1, duration: 1 } // to values
            );
        });

        gsap.fromTo(smallMenu.current, 
            { x: 100, opacity: 0 }, // from values
            { x: 0, opacity: 1, duration: 1, ease: "power1.inOut"} // to values
          );

        //   gsap.fromTo(smallNav.current, 
        //     { y: -100, opacity: 0, duration: 1, ease: "power1.inOut" }, // from values
        //     { y: 0, opacity: 1, duration: 1, ease: "power1.inOut"} // to values
        //   );
    }, []);
    
    

    const [smallscreen, Setsmallscreen] = useState(false);
    const Links = [
        {id: 1, name: 'How it works', value: '#howitworks', AniRef : linkAni},
        {id: 2, name: 'About', value: '#about', AniRef : linkAni1},
        {id: 3, name: 'Contact', value: '#contact', AniRef : linkAni2}
    ];

    const toggleNav = () => {
        Setsmallscreen(!smallscreen)
    }

    let SmallNav =
    <ul className='flex md:hidden flex-col items-center justify-around w-full min-h-[60vh] text-whiteMain bg-blackMain uppercase absolute top-full left-0 z-20 bg-white p-5' ref={smallNav}>
                {
                    Links.map(link => (
                        <li key={link.id}><a href={link.value} onClick={toggleNav} className='font-semibold text-2xl'>{link.name}</a></li>
                    ))
                }
                <div className='flex items-center justify-center text-whiteMain font-bold text-xl'>
                    <NavLink to="/signin" onClick={toggleNav}>Sign in</NavLink>
                    <span className='mx-2'>/</span>
                    <NavLink to="/signup" onClick={toggleNav}>Register</NavLink>
                </div>
    </ul> ;

    return(
        <nav className='w-full h-fit py-5 px-3 flex items-end md:items-center justify-between relative scroll-smooth text-blackMain'>
            <div className='flex items-center justify-center' ref={logoAni}>
                <img src={logo} alt="Snapsolves's Logo." className='w-[40px] md:w-[50px] lg:w-[50px]' />
                <NavLink to='/' className='font-extrabold text-lg md:text-xl lg:text-2xl'>SnapSolve</NavLink>
            </div>
            <ul className='hidden md:flex items-center justify-around md:w-[70%] lg:w-[60%] uppercase'>
                {
                    Links.map(link => (
                        <li key={link.id} ref={link.AniRef}><a href={link.value} className='font-semibold text-base hover:text-[#3c2848]/40 delay-75 ease-in-out'>{link.name}</a></li>
                    ))
                }
                <div className='flex items-center justify-center font-bold'>
                    <NavLink to="/signin">Sign in</NavLink>
                    <span className='mx-2'>/</span>
                    <NavLink to="/signup">Register</NavLink>
                </div>
            </ul>
            {
                smallscreen ? SmallNav : null
            }
            <div className='flex items-end justify-center md:hidden scroll-smooth'>
                {
                    smallscreen ? <button onClick={toggleNav} className='md:hidden text-base font-bold uppercase'>Close</button> : <button onClick={toggleNav} className='md:hidden text-base font-bold uppercase' ref={smallMenu}>Menu</button>
                }
                
            </div>
        </nav>
    )
};

export default Navigation;