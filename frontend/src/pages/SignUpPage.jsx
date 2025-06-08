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

const SignUpPage = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [viewpwd, setViewpwd] = useState(false);
    const [status, setStatus] = useState();
    const navigate = useNavigate();



    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await auth.signup({
                firstname,
                lastname,
                username,
                email,
                password
            });

            if (data.token) {
                setStatus(200);
                setMessage(data.message);
                Cookies.set('token', data.token, { expires: 3, sameSite: 'Strict' });
                Cookies.set('username', data.userName, { expires: 3, sameSite: 'Strict' });
                navigate('/dashboard', { replace: true });
            }
        } catch (err) {
            setStatus(err.response?.status);
            setMessage(err.response?.data?.message || 'Sign Up Failed');
        } finally {
            setLoading(false);
        }
    };
      

      const handleViewpwd = () => {
        setViewpwd(!viewpwd);
      }

return (
    <section className='w-full min-h-screen flex flex-col lg:flex-row bg-white'>
        {/* Left Section - Image */}    
        <div className='w-full lg:w-1/2 h-[40vh] lg:h-full lg:fixed top-0 left-0'>
            <img 
                src={sign_img} 
                alt="Forest" 
                className='w-full h-full object-cover filter brightness-[0.85] transition-transform duration-700 hover:scale-110' 
            />
            <div className='absolute inset-0 bg-gradient-to-b from-black/50 to-transparent'>
                <div className='w-full p-6 flex items-center justify-between'>
                    <div className='flex items-center space-x-3 group'>
                        <img src={logo} alt="Snapsolves's Logo." className='w-12 h-12 object-contain transform group-hover:scale-110 transition-transform duration-300' />
                        <NavLink to='/' className='font-extrabold text-xl lg:text-2xl text-white drop-shadow-lg'>
                            SnapSolve
                        </NavLink>
                    </div>
                    <NavLink 
                        to='/signin' 
                        className="text-white border-2 border-white/80 px-6 py-2.5 rounded-lg
                        hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm
                        font-semibold text-sm tracking-wide uppercase"
                    >
                        Sign In
                    </NavLink>
                </div>
            </div>
        </div>

        {/* Right Section - Form */}
        <div className='w-full lg:w-1/2 min-h-fit lg:ml-[50%] relative'>
            <div className='w-full min-h-full p-8 lg:p-16'>
                <div className='max-w-md mx-auto'>
                <h2 className='font-bold text-4xl lg:text-5xl mb-2 text-black'>Sign Up</h2>
                <h4 className='text-2xl font-bold text-black/80 mt-8 mb-2'>
                    Hey there, Explorer!
                </h4>
                <p className='text-black/60 text-lg mb-8'>Welcome to SnapSolve, Let`s make today legendary</p>

                <form onSubmit={handleSignUp} className='space-y-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <input 
                            type="text" 
                            placeholder='First Name' 
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            className='w-full p-4 text-base border border-black/20 rounded-xl outline-none
                            focus:border-black transition-colors duration-300 bg-black/5'
                            required 
                        />
                        <input 
                            type="text" 
                            placeholder='Last Name' 
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            className='w-full p-4 text-base border border-black/20 rounded-xl outline-none
                            focus:border-black transition-colors duration-300 bg-black/5'
                            required 
                        />
                    </div>

                    <input 
                        type="text" 
                        placeholder='Username' 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='w-full p-4 text-base border border-black/20 rounded-xl outline-none
                        focus:border-black transition-colors duration-300 bg-black/5'
                        required 
                    />

                    <input 
                        type="email" 
                        placeholder='Email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full p-4 text-base border border-black/20 rounded-xl outline-none
                        focus:border-black transition-colors duration-300 bg-black/5'
                        required 
                    />

                    <div className='relative'>
                        <input 
                            type={viewpwd ? "text" : "password"}
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full p-4 text-base border border-black/20 rounded-xl outline-none
                            focus:border-black transition-colors duration-300 bg-black/5 pr-12'
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
                        className={`w-full p-4 rounded-xl text-white font-semibold transition-all duration-300
                            ${loading ? 
                                'bg-black/20 cursor-not-allowed' : 
                                'bg-black hover:bg-black/90 hover:shadow-lg transform hover:scale-[1.02]'
                            }`}
                    >
                        {loading ? (
                            <div className='flex items-center justify-center space-x-2'>
                                <span className="w-6 h-6 rounded-full border-2 border-white/80 border-t-transparent animate-spin"></span>
                                <span>Creating account...</span>
                            </div>
                        ) : (
                            <span className='uppercase tracking-wide'>Sign up</span>
                        )}
                    </button>
                </form>

                {message && (
                    <div className={`mt-4 p-4 rounded-lg text-center ${
                        status === 200 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>
                        <p className="text-sm font-medium">{message}</p>
                    </div>
                )}

                <div className='flex flex-col items-center mt-8 space-y-4'>
                    <p className='text-black/60'>Or connect on</p>
                    <div className='flex items-center justify-center space-x-6'>
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
                                className='text-black/60 hover:text-black transition-all duration-300 transform hover:scale-110'
                            >
                                <social.Icon className='text-2xl' />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            </div>
        </div>
    </section>
);
}
 
export default SignUpPage;