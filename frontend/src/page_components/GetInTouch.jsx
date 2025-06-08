import { useState } from 'react';
import { TbMailFast, TbPhoneOutgoing } from "react-icons/tb";
import { email } from "../utils/api";
import gem_icon from "../assets/gem_icon-nobg.png";

const GetInTouch = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false); // Add this state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await email.sendEmail(formData);
            setFormData({ name: '', email: '', message: '' });
            // Show success message and hide it after 5 seconds
            console.log('Email sent successfully');
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 5000);
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return ( 
        <section id="contact" className="w-full py-12 px-4 overflow-hidden relative bg-gradient-to-b from-white to-gray-50">
            <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl text-blackMain font-[Montserrat] text-center uppercase mb-12">
                Get in Touch
            </h2>

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-around gap-12 p-5">
                {/* Contact Info */}
                <div className="flex flex-col items-start justify-center w-full lg:w-1/2 relative p-6">
                    <span className="absolute border-t-4 border-l-4 border-purpleMain top-0 left-0 h-10 w-10 lg:h-24 lg:w-24"></span>

                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-light pb-10 pl-8">
                        Talk to the <br /> 
                        <span className="flex items-center gap-4 font-medium mt-2">
                            Developer
                            <img 
                                src={gem_icon} 
                                alt="Gemini AI logo" 
                                className="w-10 h-10 object-contain animate-spin" 
                            />
                        </span>
                    </h3>
                    
                    <div className="space-y-4 pl-8">
                        <a 
                            href="mailto:emmanueldcode@gmail.com" 
                            className="group flex items-center gap-3 text-base md:text-lg font-medium text-gray-700 hover:text-purpleMain transition-colors duration-300"
                        >
                            <TbMailFast className="text-2xl group-hover:scale-110 transition-transform" />
                            emmanueldcode@gmail.com
                        </a>
                        <a 
                            href="tel:+2347051242451" 
                            className="group flex items-center gap-3 text-base md:text-lg font-medium text-gray-700 hover:text-purpleMain transition-colors duration-300"
                        >
                            <TbPhoneOutgoing className="text-2xl group-hover:scale-110 transition-transform" />
                            +2347051242451
                        </a>
                    </div>
                </div>

                {/* Contact Form */}
                <form 
                    onSubmit={handleSubmit}
                    className="w-full lg:w-1/2 flex flex-col gap-4 p-8 rounded-2xl bg-white shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
                >
                    <div className="space-y-6">
                        <input 
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            className="w-full p-3 text-base rounded-lg border border-gray-200 focus:border-purpleMain focus:ring-2 focus:ring-purpleMain/20 transition-all duration-300 outline-none"
                            value={formData.name}
                            onChange={handleChange}
                            required 
                        />
                        <input 
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            className="w-full p-3 text-base rounded-lg border border-gray-200 focus:border-purpleMain focus:ring-2 focus:ring-purpleMain/20 transition-all duration-300 outline-none"
                            value={formData.email}
                            onChange={handleChange}
                            required 
                        />
                        <textarea 
                            name="message"
                            placeholder="Your Message..."
                            className="w-full h-32 p-3 text-base rounded-lg border border-gray-200 focus:border-purpleMain focus:ring-2 focus:ring-purpleMain/20 transition-all duration-300 outline-none resize-none"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        className={`
                            w-full p-4 rounded-lg text-white font-medium text-lg transition-all duration-300
                            ${loading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-purpleMain to-blue-600 hover:shadow-lg hover:shadow-purpleMain/20'
                            }
                        `}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                Sending...
                            </div>
                        ) : 'Send Message'}
                    </button>
                    {/* Show success message */}
            {showSuccess && (
                <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-out z-50 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Message sent successfully!
                </div>
            )}
                </form>
            </div>
        </section>
    );
};

export default GetInTouch;