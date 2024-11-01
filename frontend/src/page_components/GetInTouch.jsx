import gem_icon from "../assets/gem_icon-nobg.png";
import { TbMailFast } from "react-icons/tb";
import { TbPhoneOutgoing } from "react-icons/tb";
import { useState } from 'react';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


const GetInTouch = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    // const notify = () => toast.success("Message sent successfully!");
    // const errorT = () => toast.error("Error sending message!");

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      try {
        const res = await fetch('https://snap-solve-nine.vercel.app/main/sendEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (res.ok) {
            setFormData({ name: '', email: '', message: '' });
            alert('Message sent successfully!');
        } else {
          alert('Error sending message!');
        }
      } catch (err) {
        console.error(err);
        alert('Error sending message!');
      } finally {
        setLoading(false); // Stop loading after the request is done
      }
    };
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return ( 
        <section id="contact" className="w-full py-4 px-3 overflow-hidden relative">
            
            <h2 className="font-bold text-4xl md:text-4xl lg:text-6xl text-blackMain font-[Montserrat] text-center uppercase my-5">Get in Touch</h2>
            <div className="flex flex-col lg:flex-row items-center justify-evenly p-5">
                <div className="flex flex-col items-start justify-center mx-auto py-3 relative">
                    <span className="absolute border-t-4 border-l-4 border-purpleMain top-0 left-0 h-[5vh] w-[10vw] md:h-[10vh] md:w-[10vw] lg:w-[5vw]"></span>

                    <h3 className="text-5xl md:text-6xl font-light pb-10  py-3 px-4 md:py-6 md:px-6">Talk to the <br /> <span className="flex items-center justify-center font-medium"> Developer<img src={gem_icon} alt="Gemini AI logo" className="w-10 h-fit object-contain animate-spin" /></span></h3>
                    
                    <a href="mailto:emmanueldcode@gamil.com" className="text-base md:text-lg font-bold text-blackMain/80 uppercase hover:text-purpleMain flex items-center justify-between"><TbMailFast className="text-3xl mx-2" /> emmanueldcode@gmail.com</a>
                    <a href="tel:+2347051242451" className="text-base md:text-lg font-bold text-blackMain/80 uppercase hover:text-purpleMain flex items-center justify-between"><TbPhoneOutgoing className="text-3xl mx-2" /> +2347051242451</a>
                </div>
                <form action="post" className="w-[100%] md:w-[70%] lg:w-[40%] flex flex-col items-center justify-evenly p-5 rounded-lg bg-purpleMain text-blackMain shadow-xl" onSubmit={handleSubmit}>
                    <input type="text" name="name" id="name" placeholder="Name" className="w-[80%] p-2 text-base md:text-lg rounded my-2 font-light outline-none"
                    value={formData.name}
                    onChange={handleChange}
                    required />
                    <input type="text" name="email" id="email" placeholder="Email" className="w-[80%] p-2 text-base md:text-lg rounded my-2 font-light outline-none"
                    value={formData.email}
                    onChange={handleChange}
                    required />
                    <textarea name="message" id="message" placeholder="Message...." className="w-[80%] h-[20vh] p-2 text-base md:text-lg rounded my-2 font-light outline-none"
                    value={formData.message}
                    onChange={handleChange}
                    required></textarea>
                    <button type="submit" name="submit"  id="Submit" disabled={loading} className={loading ? `w-[80%] p-2 text-lg rounded my-2 bg-blackMain/30 font-meduim cursor-notallowed text-whiteMain` : `w-[80%] p-2 text-lg rounded my-2 bg-gradient-to-tr from-orangeMain to-yellowMain font-meduim cursor-pointer text-whiteMain hover:shadow-xl`}>{loading ? <div className='w-full h-fit flex items-center justify-center text-xl py-10'><span className="w-[30px] h-[30px] rounded-full bg-transparent border-[2px] border-blueMain border-dashed animate-spin duration-75 mx-2"></span>Sending</div> : 'Send Message'}</button>
                    
                </form>
            </div>
        </section>
     );
}
 
export default GetInTouch;