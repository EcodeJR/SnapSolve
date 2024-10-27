import Man_upload from "../assets/man_upload.jpeg"
import Upload_ui from "../assets/upload_ui.jpeg"
import Ai_ui from "../assets/ai_ui.jpeg"
//icons
import { FaRegEye } from "react-icons/fa";
import { TiMessageTyping } from "react-icons/ti";
import { RiAiGenerate } from "react-icons/ri";
import { SiTeamspeak } from "react-icons/si";

//others
import { NavLink } from "react-router-dom";
const HowItWorks = () => {
    return ( 
    <section id="howitworks" className='w-full h-fit p-3'>
        <h2 className='font-bold text-4xl md:text-4xl lg:text-6xl text-blackMain font-[Montserrat] text-center uppercase my-5'>How It Works</h2>

        <div className='w-full grid grid-cols-1 md:grid-cols-3 place-items-center gap-5 py-4'>
            <div className='p-5 text-center flex flex-col items-center justify-evenly rounded bg-whiteMain shadow-lg border-[1px] border-blackMain/20'>
                <img src={Man_upload} className="w-full rounded object-cover mb-3" alt="SnapSolve instructions." />
                <h3 className='font-bold text-2xl text-blackMain uppercase'>Take a Photo</h3>
                <p className="font-semibold text-blackMain/60 text-base">Keep in mind that the question needs to be clear so the AI can accurately understand and respond.</p>
            </div>
            <div className='p-5 text-center flex flex-col items-center justify-evenly rounded bg-whiteMain shadow-lg border-[1px] border-blackMain/20'>
                <img src={Upload_ui} className="w-full rounded object-cover mb-3" alt="SnapSolve instructions." />
                <h3 className='font-bold text-2xl text-blackMain uppercase'>Upload your Image</h3>
                <p className="font-semibold text-blackMain/60 text-base">In your dashboard, you can upload an image for identification.</p>
            </div>
            <div className='p-5 text-center flex flex-col items-center justify-evenly rounded bg-whiteMain shadow-lg border-[1px] border-blackMain/20'>
                <img src={Ai_ui} className="w-full rounded object-cover mb-3" alt="SnapSolve instructions." />
                <h3 className='font-bold text-2xl text-blackMain uppercase'>Get AI Solutions</h3>
                <p className="font-semibold text-blackMain/60 text-base">The AI provides accurate answers to the questions detected in the image.</p>
            </div>
        </div>
        <div className="flex flex-wrap flex-col md:flex-row items-center justify-evenly py-4">
            <div className="flex flex-col items-start justify-center w-full md:w-[50%] my-4">
                <h4 className="font-bold text-6xl md:text-6xl lg:text-8xl">Effortlessly Solve <br /> Challenges <br /> With <br />SnapSolve.</h4>
                <p className="text-base font-semibold text-justify text-blackMain/70 py-4 px-2">No more struggling to figure out complex problems. Just upload an image of your question, and our powerful AI will quickly identify and deliver the solution you need. Whether it's math equations, technical questions, or anything in between, SnapSolve makes the process effortless. With a simple and intuitive interface, you're just one snap away from getting the answers you're looking for. Let SnapSolve take the hassle out of problem-solving, so you can focus on what really matters!</p>
                <NavLink to="dashboard" className="text-whiteMain bg-purpleMain py-3 px-6 lg:px-12 font-semibold rounded-md hover:shadow-xl">TRY FOR FREE</NavLink>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-3 w-full md:w-[50%]">
                <div className="p-3 bg-whiteMain rounded-md flex flex-col items-start justify-evenly shadow-xl">
                    <FaRegEye className="font-bold text-petchMain text-4xl md:text-6xl" />
                    <h5 className="font-bold text-2xl md:text-3xl my-3">Image Recognition</h5>
                    <p className="text-base text-blackMain/70 font-semibold">Snap, upload, and let our AI work its magic! Instantly recognize and decode any image, making problem-solving a breeze.</p>
                </div>
                <div className="p-3 bg-whiteMain rounded-md flex flex-col items-start justify-evenly shadow-xl">
                    <TiMessageTyping className="font-bold text-petchMain text-4xl md:text-6xl" />
                    <h5 className="font-bold text-2xl md:text-3xl my-3">Text Recognition</h5>
                    <p className="text-base text-blackMain/70 font-semibold">SnapSolve instantly turns images into readable text, and you can chat with the AI for instant help. It's like having a smart assistant on call!</p>
                </div>
                <div className="p-3 bg-whiteMain rounded-md flex flex-col items-start justify-evenly shadow-xl">
                    <RiAiGenerate className="font-bold text-petchMain text-4xl md:text-6xl" />
                    <h5 className="font-bold text-2xl md:text-3xl my-3">Text Generation</h5>
                    <p className="text-base text-blackMain/70 font-semibold">Get instant, AI-generated solutions! Whether it’s answers or explanations, we craft the perfect text to solve your problem in a snap.</p>
                </div>
                <div className="p-3 bg-whiteMain rounded-md flex flex-col items-start justify-evenly shadow-xl">
                    <SiTeamspeak className="font-bold text-petchMain text-4xl md:text-6xl" />
                    <h5 className="font-bold text-2xl md:text-3xl my-3">Human Interaction</h5>
                    <p className="text-base text-blackMain/70 font-semibold">Like chatting with a friend! SnapSolve’s AI feels personal, making interactions natural and fun, while giving you the answers you need.</p>
                </div>
            </div>
        </div>
    </section> 
)};
 
export default HowItWorks;