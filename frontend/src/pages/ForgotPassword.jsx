import { useState } from 'react';
import { auth } from '../utils/api';
import sign_img from '../assets/forest.jpeg';
import logo from '../assets/snapsolveLogo.png';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await auth.forgotPassword(email);
            setStatus(200);
            setMessage(response.message);
        } catch (error) {
            setStatus(error.response?.status);
            setMessage(error.response?.data?.message || 'Error processing request');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='w-full min-h-screen flex flex-col lg:flex-row bg-whiteMain'>
            {/* Left Section - Image */}
            <div className='hidden lg:flex lg:w-[50%] h-screen relative'>
                <img 
                    src={sign_img} 
                    alt="Sign in background" 
                    className='w-full h-full object-cover'
                />
                <div className='absolute inset-0 bg-black/40'></div>
                <div className='absolute top-8 left-8 flex items-center gap-4 justify-center'>
                                    <img src={logo} alt="SnapSolve Logo" className='w-44' />
                                    <Link to="/" className='font-extrabold text-xl lg:text-2xl text-white drop-shadow-md'>Snapsolve</Link>
                                </div>
            </div>

            {/* Right Section - Form */}
            <div className='w-full lg:w-[50%] min-h-screen flex flex-col p-8 lg:p-16'>
                <div className='flex-1 flex flex-col justify-center max-w-md mx-auto w-full'>
                    <h2 className='font-bold text-4xl lg:text-5xl mb-6'>Reset Password</h2>
                    <p className='text-black/60 text-lg mb-8'>
                        Enter your email address and we`ll send you a link to reset your password.
                    </p>

                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <input 
                            type="email" 
                            placeholder='Email' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full p-4 text-base border border-black/20 rounded-xl outline-none
                            focus:border-black/40 transition-colors duration-300 bg-black/5'
                            required 
                        />

                        <button 
                            type="submit"
                            disabled={loading}
                            className={`w-full p-4 rounded-xl text-white font-medium transition-all duration-300
                                ${loading ? 'bg-black/20 cursor-not-allowed' : 'bg-black hover:bg-black/80'}`}
                        >
                            {loading ? (
                                <div className='flex items-center justify-center gap-2'>
                                    <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                                    <span>Sending...</span>
                                </div>
                            ) : (
                                <span>Send Reset Link</span>
                            )}
                        </button>
                    </form>

                    {message && (
                        <p className={`text-base font-medium mt-4 text-center
                            ${status === 200 ? 'text-green-600' : 'text-red-600'}`}>
                            {message}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;