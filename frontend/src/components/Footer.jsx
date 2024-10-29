import logo from '../assets/snapsolveLogo.png';
//others
import { NavLink } from 'react-router-dom';
const Footer = () => {
    return ( 
        <footer className='p-3'>
            <div className='flex flex-col md:flex-row items-center justify-between'>
                <div className='flex items-center justify-center'>
                    <img src={logo} alt="Snapsolves's Logo." className='w-[40px] md:w-[50px] lg:w-[50px]' />
                    <NavLink to='/' className='font-extrabold text-2xl md:text-4xl lg:text-4xl'>SnapSolve</NavLink>
                </div>
                <div className='flex items-center justify-center my-3 md:my-0'>
                    <NavLink to='/privacy_policy' className='text-sm md:text-base hover:font-bold text-blackMain uppercase mx-2'>Privacy Policies</NavLink>
                    <NavLink to='/rules' className='text-sm md:text-base hover:font-bold text-blackMain uppercase mx-2'>Rules</NavLink>
                    <NavLink to="/dashboard" className='text-sm md:text-base text-whiteMain uppercase mx-2 bg-purpleMain rounded px-4 py-2 hover:shadow-xl text-center'>Try Now</NavLink>
                </div>
                
            </div>
            <hr className='h-1 w-[90%] border-0 mx-auto bg-blackMain/30 my-4' />
            <h4 className='text-center font-bold text-lg'>&copy; SnapSolve 2024</h4>
        </footer>
     );
}
 
export default Footer;