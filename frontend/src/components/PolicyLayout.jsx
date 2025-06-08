import Navigation from './Navigation';
import Footer from "./Footer";
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const PolicyLayout = ({ title, subtitle, children }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="w-full min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
            <Navigation />
            <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-16">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="font-bold text-3xl md:text-5xl lg:text-7xl uppercase font-[Montserrat] tracking-wider bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        {title.split(' ').map((word, i) => (
                            <span key={i}>
                                {word}
                                <br className="hidden md:block" />
                            </span>
                        ))}
                    </h1>
                    <p className="text-lg mt-6 w-full md:w-[70%] text-gray-600 leading-relaxed">
                        {subtitle}
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-12">
                    {children}
                </div>
            </div>
            <Footer />
        </section>
    );
};
// Add PropTypes validation
PolicyLayout.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default PolicyLayout;