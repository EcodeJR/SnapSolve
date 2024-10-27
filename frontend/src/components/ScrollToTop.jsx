import { useState, useEffect } from 'react';
import { BsArrowDown } from 'react-icons/bs';

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Handle scroll events
  const handleScroll = () => {
    if (window.scrollY > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to the top of the page when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      bottom: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button className="fixed z-80 bottom-10 lg:bottom-2 right-5 p-5 lg:p-4 rounded-full shadow-lg animate-bounce bg-blueMain" onClick={scrollToTop}>
          <BsArrowDown className='font-bold text-whiteMain text-2xl text-secondary' />
        </button>
      )}
    </>
  );
}

export default BackToTopButton;