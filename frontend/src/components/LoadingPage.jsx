import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import logo from '../assets/snapsolveLogo.png';
import PropTypes from 'prop-types';

const LoadingPage = ({ setIsLoaded }) => {
    const loadingRef = useRef(null);
    const containerRef = useRef(null);
    const handleLoadRef = useRef(null);
    const cleanupRef = useRef({ 
        timeouts: [],
        animations: [],
        elements: []
    });

    useEffect(() => {
        // Store cleanup references
        const cleanup = cleanupRef.current;
        
        // Create glass morphism effect
        const createGlassEffect = () => {
            const container = containerRef.current;
            if (!container) return;
            
            // Create gradient background
            container.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)';
            container.style.overflow = 'hidden';
            container.style.position = 'relative';
            
            // Create glass morphism elements
            const createGlassElement = (size, x, y) => {
                const el = document.createElement('div');
                el.style.position = 'absolute';
                el.style.width = `${size}px`;
                el.style.height = `${size}px`;
                el.style.background = 'rgba(255, 255, 255, 0.1)';
                el.style.backdropFilter = 'blur(10px)';
                el.style.borderRadius = '50%';
                el.style.filter = 'blur(30px)';
                el.style.opacity = '0';
                el.style.left = `${x}%`;
                el.style.top = `${y}%`;
                el.style.transform = 'translate(-50%, -50%)';
                container.appendChild(el);
                return el;
            };
            
            // Create optimized glass elements (reduced from 10 to 6)
            const elements = [];
            const positions = [
                [20, 30], [75, 25], [30, 70], 
                [80, 50], [20, 60], [70, 75]
            ];
            
            // Create a single animation timeline for better performance
            const glassAnimation = gsap.timeline({ 
                repeat: -1, 
                yoyo: true,
                defaults: { ease: 'sine.inOut', force3D: true }
            });
            
            positions.forEach(([x, y], i) => {
                const size = 150 + Math.random() * 150; // Slightly larger but fewer elements
                const el = createGlassElement(size, x, y);
                elements.push(el);
                
                // Add to timeline with staggered delays
                glassAnimation.to(el, {
                    opacity: 0.3 + Math.random() * 0.3,
                    duration: 6 + Math.random() * 4, // More consistent duration
                    x: `+=${(Math.random() - 0.5) * 15}`,
                    y: `+=${(Math.random() - 0.5) * 15}`,
                    scale: 1 + Math.random() * 0.3 // Less aggressive scaling
                }, i * -0.8); // Overlap animations for smoother effect
            });
            
            // Store for cleanup
            cleanup.animations.push(glassAnimation);
            cleanup.elements.push(...elements);
            
            return elements;
        };
        
        // Create the glass effect (elements are stored in cleanup.elements)
        createGlassEffect();

        // Main animation timeline
        const tl = gsap.timeline();
        
        // Initial animation
        gsap.set('.loading-content', { opacity: 0, y: 20 });
        gsap.set('.logo', { scale: 0.8, opacity: 0 });
        gsap.set('.progress-bar', { scaleX: 0 });
        
        tl.to('.logo', { 
            scale: 1, 
            opacity: 1, 
            duration: 1, 
            ease: 'back.out(1.7)' 
        })
        .to('.loading-content', { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            ease: 'power2.out' 
        }, '-=0.5')
        .to('.progress-bar', { 
            scaleX: 1, 
            duration: 3, 
            ease: 'power1.inOut'
        });

        // Handle loading completion
        const handleLoad = () => {
            gsap.to(loadingRef.current, {
                opacity: 0,
                duration: 0.8,
                ease: 'power2.in',
                onComplete: () => {
                    setIsLoaded(true);
                }
            });
        };

        // Store timeouts for cleanup
        cleanup.timeouts.push(
            // Timeout fallback
            setTimeout(() => {
                if (loadingRef.current && (!loadingRef.current.style.opacity || loadingRef.current.style.opacity !== '0')) {
                    handleLoad();
                }
            }, 6000),
            
            // Start animations after a short delay
            setTimeout(() => {
                tl.play();
            }, 300)
        );

        // Store main timeline for cleanup
        cleanup.animations.push(tl);
        
        // Cleanup
        // Store handleLoad in ref to maintain reference
        handleLoadRef.current = handleLoad;
        
        // Add event listener for page load
        window.addEventListener('load', handleLoad);
        
        // Cleanup function
        return () => {
            window.removeEventListener('load', handleLoad);
            
            // Clear all timeouts
            cleanup.timeouts.forEach(clearTimeout);
            
            // Kill all animations
            cleanup.animations.forEach(anim => {
                try {
                    if (anim && typeof anim.kill === 'function') {
                        anim.kill();
                    }
                } catch (e) {
                    console.warn('Error killing animation:', e);
                }
            });
            
            // Clean up DOM elements
            cleanup.elements.forEach(el => {
                try {
                    if (el && el.parentNode) {
                        el.parentNode.removeChild(el);
                    }
                } catch (e) {
                    console.warn('Error removing element:', e);
                }
            });
            
            // Clear all references
            cleanup.timeouts = [];
            cleanup.animations = [];
            cleanup.elements = [];
        };
    }, [setIsLoaded]);

    return (
        <div
            ref={loadingRef}
            className="fixed inset-0 flex flex-col items-center justify-center text-white z-50 overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-gray-800"></div>
            <div 
                ref={containerRef}
                className="absolute inset-0"
            >
                <div className="absolute inset-0 backdrop-blur-sm"></div>
            </div>
            
            <div className="relative z-10 text-center p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl">
                <img 
                    src={logo} 
                    alt="Snapsolve Logo" 
                    className="logo w-32 md:w-40 lg:w-48 mb-6 mx-auto drop-shadow-lg"
                />
                
                <div className="loading-content">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-200">
                        SnapSolve
                    </h1>
                    <p className="text-gray-300 mb-6 text-sm md:text-base">Preparing your experience</p>
                    
                    <div className="w-48 md:w-64 h-1.5 bg-gray-800/50 rounded-full overflow-hidden mx-auto backdrop-blur-sm">
                        <div className="progress-bar h-full bg-gradient-to-r from-purple-400 to-pink-400 origin-left shadow-lg shadow-purple-400/20"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

LoadingPage.propTypes = {
    setIsLoaded: PropTypes.func.isRequired,
};

export default LoadingPage;