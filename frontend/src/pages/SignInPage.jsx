import sign_img from '../assets/forest.jpeg';
import logo from '../assets/snapsolveLogo.png';
//icons
import { FaFacebook } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
//others
import { NavLink } from 'react-router-dom';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { auth } from '../utils/api';

const SignInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [viewpwd, setViewpwd] = useState(false);
    const [status, setStatus] = useState();
    const navigate = useNavigate();



    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await auth.signin({ email, password });
            
            if (data.token) {
                Cookies.set('token', data.token, { expires: 3 });
                Cookies.set('username', data.userName, { expires: 3 });
                setStatus(200);
                setMessage("Sign In Successful!");
                setEmail("");
                setPassword("");
                navigate('/dashboard', { replace: true });
            }
        } catch (err) {
            setStatus(err.response?.status);
            setMessage(err.response?.data?.message || 'Sign In Failed');
        } finally {
            setLoading(false);
        }
    };


      const handleViewpwd = () => {
        setViewpwd(!viewpwd);
      }

return ( 
    <section className='w-full min-h-screen flex flex-col lg:flex-row bg-whiteMain'>
        {/* Left Section - Fixed */}
        <div className='w-full lg:w-1/2 h-[40vh] lg:h-full lg:fixed top-0 left-0'>
            <img 
                src={sign_img} 
                alt="Forest" 
                className='w-full h-full object-cover filter brightness-[0.85]' 
            />
            <div className='absolute inset-0 bg-gradient-to-b from-black/30 to-transparent'>
                <div className='w-full p-6 flex items-center justify-between'>
                    <div className='flex items-center space-x-3'>
                        <img src={logo} alt="Snapsolves's Logo." className='w-12 h-12 object-contain' />
                        <NavLink to='/' className='font-extrabold text-xl lg:text-2xl text-white drop-shadow-md'>
                            SnapSolve
                        </NavLink>
                    </div>
                    <NavLink 
                        to='/signup' 
                        className="text-white border-2 border-white/80 px-6 py-2.5 rounded-lg
                        hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm
                        font-semibold text-sm tracking-wide uppercase"
                    >
                        Sign Up
                    </NavLink>
                </div>
            </div>
        </div>

        {/* Right Section - Form */}
        <div className='w-full lg:w-1/2 min-h-fit lg:ml-[50%] relative'>
            <div className='w-full min-h-full p-8 lg:p-16'>
                <div className='max-w-md mx-auto'>
                <h2 className='font-bold text-4xl lg:text-5xl mb-2'>Sign In</h2>
                <h4 className='text-2xl font-bold text-black/80 mt-8 mb-2'>
                    Hey there, Explorer!
                </h4>
                <p className='text-black/60 text-lg mb-8'>Welcome back, Let`s make today legendary</p>

                <form onSubmit={handleSignIn} className='space-y-4'>
                    <div className='space-y-2'>
                        <input 
                            type="email" 
                            placeholder='Email' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full p-4 text-base border border-black/20 rounded-xl outline-none
                            focus:border-black/40 transition-colors duration-300 bg-black/5'
                            required 
                        />
                    </div>

                    <div className='relative'>
                        <input 
                            type={viewpwd ? "text" : "password"}
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full p-4 text-base border border-black/20 rounded-xl outline-none
                            focus:border-black/40 transition-colors duration-300 bg-black/5 pr-12'
                            required 
                        />
                        <button 
                            type="button"
                            onClick={handleViewpwd}
                            className='absolute right-4 top-1/2 -translate-y-1/2 text-black/50 hover:text-black transition-colors duration-300'
                        >
                            {viewpwd ? 
                                <GoEyeClosed className='text-2xl' /> : 
                                <GoEye className='text-2xl' />
                            }
                        </button>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading} 
                        className={`w-full p-4 rounded-xl text-white font-semibold
                            ${loading ? 
                                'bg-black/20 cursor-not-allowed' : 
                                'bg-black hover:bg-black/90 transition-all duration-300'
                            }`}
                    >
                        {loading ? (
                            <div className='flex items-center justify-center space-x-2'>
                                <span className="w-6 h-6 rounded-full border-2 border-white/80 border-t-transparent animate-spin"></span>
                                <span>Signing in...</span>
                            </div>
                        ) : (
                            <span className='uppercase tracking-wide'>Sign in</span>
                        )}
                    </button>
                    <div className="mx-auto flex justify-center items-center">
                        <NavLink 
                            to="/forgot-password"
                            className="text-blue-500 hover:text-blue-600 transition-colors"
                        >
                            Forgot Password?
                        </NavLink>
                    </div>
                </form>

                {message && (
                    <p className={`text-base font-medium mt-4 text-center
                        ${status === 200 ? 'text-green-600' : 'text-red-600'}`}>
                        {message}
                    </p>
                )}
                <p className={`text-base font-medium mt-4 text-center text-blackMain`}>
                        Don`t have an account? 
                        <NavLink 
                        to='/signup' 
                        className="text-green-500 tracking-wide uppercase mx-2"
                    >
                         Sign Up
                    </NavLink>
                    </p>

                <div className='flex items-center justify-center space-x-4 mt-8'>
                    {[
                        { Icon: FaFacebook, href: "https://www.facebook.com/emmanuel.dalyop.96/" },
                        { Icon: FaSquareWhatsapp, href: "https://wa.me/+23451242451" },
                        { Icon: FaSquareXTwitter, href: "https://x.com/EcodeJR" },
                        { Icon: FaLinkedin, href: "https://www.linkedin.com/in/emmanuel-dalyop-5b6a1b178/" }
                    ].map((social, index) => (
                        <a 
                            key={index}
                            href={social.href} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className='text-black/70 hover:text-black transition-colors duration-300'
                        >
                            <social.Icon className='text-2xl' />
                        </a>
                    ))}
                </div>
            </div>
            </div>
        </div>
    </section>
);
}
 
export default SignInPage;