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
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

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
        if (Cookies.get('token') || Cookies.get('username')) {
          Cookies.remove('token', { path: '/', secure: true, sameSite: 'Strict' });
          Cookies.remove('username', { path: '/', secure: true, sameSite: 'Strict' });
        }
      
        if (localStorage.getItem('token') || localStorage.getItem('username')) {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
        }

        try {
          const response = await axios.post("http://localhost:8080/auth/signin", {
            email,
            password,
          });
          if (response.data.token) {
            // console.log(response.data)
            Cookies.set('token', response.data.token, { expires: 3 });
            localStorage.setItem("token", response.data.token); // Save token for future use
            // console.log(response);
            Cookies.set('username', response.data.userName, { expires: 3 });
            localStorage.setItem("username", response.data.userName);
            setStatus(response.status);
            setMessage("Sign In Successful!");
            setEmail("");
            setPassword("");
            navigate('/dashboard', { replace: true });
          } else {
          setStatus(response.status);
            setMessage("Sign In Failed");
          }
        } catch (err) {
          setStatus(err.status);
          setMessage(err.response.data.message);
        } finally {
            setLoading(false);
        }
      };


      const handleViewpwd = () => {
        setViewpwd(!viewpwd);
      }

    return ( 
        <section className='w-full h-fit lg:h-screen flex flex-col lg:flex-row items-center justify-evenly bg-whiteMain'>
            <div className='w-full lg:w-[50%] h-[40vh] lg:h-full p-10 rounded-lg overflow-hidden relative'>
                <img src={sign_img} alt="Forest" className='top-0 absolute left-0 w-[100%] h-[100%] object-cover z-0' />
                <div className='w-full h-full absolute top-0 left-0 z-10'>
                    <div className='w-full p-5 flex items-center justify-between'>
                        <div className='flex items-center justify-center'>
                            <img src={logo} alt="Snapsolves's Logo." className='w-[40px] md:w-[50px] lg:w-[50px]' />
                            <NavLink to='/' className='font-extrabold text-lg md:text-xl lg:text-2xl text-whiteMain'>SnapSolve</NavLink>
                        </div>
                        <NavLink to='/signup' className="text-whiteMain border-[2px] border-whiteMain uppercase font-bold text-base px-7 py-3 rounded-lg">Sign Up</NavLink>
                    </div>
                </div>
            </div>
            <div className='w-full lg:w-[50%] h-[50vh] lg:h-full flex flex-col items-center justify-between p-5'>
                <h2 className='font-bold text-4xl lg:text-5xl'>Sign In</h2>
                <div className='w-full h-full flex flex-col items-center justify-center'>
                    <h4 className='text-2xl md:text-3xl text-center font-bold my-2'>
                    Hey there, Explorer!
                    </h4>
                    <p className='text-blackMain/60 text-center text-base mb-3'>Welcome back, Let’s make today legendary</p>
                    <form onSubmit={handleSignIn} className='w-full flex flex-col items-center justify-center'>
                        <input type="email" id="email" name="email" placeholder='Email' value={email}
          onChange={(e) => setEmail(e.target.value)} className='w-[90%] lg:w-[70%] p-2 my-2 text-base border-[1px] border-blackMain/70 rounded-md outline-none' required />
                        <div className='w-[90%] lg:w-[70%] border-[1px] border-blackMain/70 rounded-md flex items-center justify-around my-2'>
                            <input type={viewpwd ? "text" : "password"} 
                            id="password" name="password" placeholder='Password' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            className='w-full h-full p-2 text-base rounded-md outline-none' required />
                                {viewpwd ? <GoEyeClosed onClick={handleViewpwd} className='text-2xl mx-2 cursor-pointer' /> : <GoEye onClick={handleViewpwd} className='text-2xl mx-2 cursor-pointer' />}
                </div>
                        <input type="submit" value={loading ? "Loading..." : "Submit"} disabled={loading} className={`w-[70%] p-3 text-base ${loading ? 'bg-purpleMain/20 hover:shadow-none cursor-not-allowed' : 'bg-purpleMain cursor-pointer'} text-whiteMain rounded-md hover:shadow-2xl outline-none`} />
                    </form>
                    {status == 200 ? <p className='text-base font-bold text-greenMain mt-3'>{message}</p> : <p className='text-base font-bold text-redMain mt-3'>{message}</p>}
                    
                    <div className='flex items-center justify-center mt-7'>
                        <FaFacebook className='text-2xl cursor-pointer text-blackMain/80 mx-2' />
                        <FaSquareWhatsapp className='text-2xl cursor-pointer text-blackMain/80 mx-2' />
                        <FaSquareXTwitter className='text-2xl cursor-pointer text-blackMain/80 mx-2' />
                        <FaLinkedin className='text-2xl cursor-pointer text-blackMain/80 mx-2' />
                    </div>
                </div>
                
            </div>
        </section>
     );
}
 
export default SignInPage;