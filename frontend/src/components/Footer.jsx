import logo from '../assets/snapsolveLogo.png';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return ( 
        <footer className="w-full bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Main Footer Content */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-2 group">
                        <img 
                            src={logo} 
                            alt="SnapSolve's Logo" 
                            className="w-10 h-10 md:w-12 md:h-12 object-contain transition-transform duration-300 group-hover:scale-110" 
                        />
                        <NavLink 
                            to="/" 
                            className="text-2xl md:text-3xl font-bold text-gray-900 hover:text-purpleMain transition-colors duration-300"
                        >
                            SnapSolve
                        </NavLink>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex items-center gap-4 md:gap-8">
                        <NavLink 
                            to="/privacy_policy" 
                            className="text-sm md:text-base text-gray-600 hover:text-purpleMain transition-colors duration-300"
                        >
                            Privacy Policy
                        </NavLink>
                        <NavLink 
                            to="/rules" 
                            className="text-sm md:text-base text-gray-600 hover:text-purpleMain transition-colors duration-300"
                        >
                            Rules
                        </NavLink>
                        <NavLink 
                            to="/dashboard" 
                            className="px-4 py-2 text-sm md:text-base text-white bg-purpleMain rounded-lg
                                hover:bg-purpleMain/90 transition-all duration-300 
                                hover:shadow-lg hover:shadow-purpleMain/20"
                        >
                            Try Now
                        </NavLink>
                    </nav>
                </div>

                {/* Divider */}
                <div className="my-8">
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                </div>

                {/* Copyright */}
                <div className="text-center">
                    <p className="text-sm md:text-base text-gray-600">
                        &copy; {new Date().getFullYear()} SnapSolve. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;