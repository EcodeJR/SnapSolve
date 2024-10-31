import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import logo from '../assets/snapsolveLogo.png';
import PropTypes from 'prop-types';

const LoadingPage = ({ setIsLoaded }) => {
    const loadingRef = useRef();

    useEffect(() => {
        const fadeOutLoadingScreen = () => {
            gsap.to(loadingRef.current, {
                y: -50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                onComplete: () => {
                    setIsLoaded(true);
                },
            });
        };

        // Primary listener for the window load event
        const handleLoad = () => {
            fadeOutLoadingScreen();
        };

        // Timeout fallback in case the load event delays or fails
        const timeoutId = setTimeout(() => {
            if (!loadingRef.current.style.opacity || loadingRef.current.style.opacity !== '0') {
                fadeOutLoadingScreen();
            }
        }, 5000); // 5-second fallback timeout

        // Listen for window load event
        window.addEventListener('load', handleLoad);

        // Clean up the event listener and timeout on component unmount
        return () => {
            window.removeEventListener('load', handleLoad);
            clearTimeout(timeoutId);
        };
    }, [setIsLoaded]);

    return (
        <div
            ref={loadingRef}
            className="fixed inset-0 flex flex-col items-center justify-center bg-purpleMain text-whiteMain"
        >
            <img src={logo} alt="Snapsolve's Logo." draggable="true" className='w-[100px] md:w-[150px] lg:w-[200px] animate-bounce' />
            <h1 className="text-2xl">Loading...</h1>
        </div>
    );
};

LoadingPage.propTypes = {
    setIsLoaded: PropTypes.func.isRequired,
};

export default LoadingPage;