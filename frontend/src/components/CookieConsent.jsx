import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CookieConsent = ({ darkMode }) => {
    const [showConsent, setShowConsent] = useState(false);

    useEffect(() => {
        const hasConsent = localStorage.getItem('cookieConsent');
        if (!hasConsent) {
            setShowConsent(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setShowConsent(false);
    };

    if (!showConsent) return null;

    return (
        <div className={`fixed bottom-0 left-0 right-0 z-[9999] p-4 ${
            darkMode ? 'bg-gray-800/95 text-white' : 'bg-white/95 text-gray-800'
        } border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow-lg backdrop-blur-sm`}>
            <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-4">
                <div className="text-sm max-w-2xl">
                    <p>
                        We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{' '}
                        <a 
                            href="/privacy_policy" 
                            className="text-blue-500 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Learn more
                        </a>
                    </p>
                </div>
                <div className="flex gap-4 shrink-0">
                    <button
                        onClick={handleAccept}
                        className={`px-6 py-2 rounded-lg transition-colors ${
                            darkMode 
                                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                    >
                        Accept All Cookies
                    </button>
                </div>
            </div>
        </div>
    );
};

CookieConsent.propTypes = {
    darkMode: PropTypes.bool
};

export default CookieConsent;