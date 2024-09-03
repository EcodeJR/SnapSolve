import SnapPaper from "../assets/snap_paper.jpeg"
import UploadPaper from "../assets/upload_paper.jpeg"
import Results from "../assets/results.jpeg"
//icons
import { FaRegEye } from "react-icons/fa";
import { TiMessageTyping } from "react-icons/ti";
import { RiAiGenerate } from "react-icons/ri";
import { SiTeamspeak } from "react-icons/si";
const HowItWorks = () => {
    return ( 
    <section className='w-full h-fit p-3'>
        <h2 className='font-bold text-4xl md:text-4xl lg:text-6xl text-blackMain font-[Montserrat] text-center uppercase my-5'>How It Works</h2>

        <div className='w-full grid grid-cols-1 md:grid-cols-3 place-items-center gap-5 py-4'>
            <div className='p-5 text-center flex flex-col items-center justify-evenly rounded bg-whiteMain shadow-lg border-[1px] border-blackMain/20'>
                <img src={SnapPaper} className="w-full rounded object-cover mb-3" alt="SnapSolve instructions." />
                <h3 className='font-bold text-2xl text-blackMain uppercase'>Take a Photo</h3>
                <p className="font-semibold text-blackMain/60 text-base">Keeping in mind the question has to be clear for the AI to identify.</p>
            </div>
            <div className='p-5 text-center flex flex-col items-center justify-evenly rounded bg-whiteMain shadow-lg border-[1px] border-blackMain/20'>
                <img src={UploadPaper} className="w-full rounded object-cover mb-3" alt="SnapSolve instructions." />
                <h3 className='font-bold text-2xl text-blackMain uppercase'>Upload your Image</h3>
                <p className="font-semibold text-blackMain/60 text-base">In your dashboard you upload the image, for identification.</p>
            </div>
            <div className='p-5 text-center flex flex-col items-center justify-evenly rounded bg-whiteMain shadow-lg border-[1px] border-blackMain/20'>
                <img src={Results} className="w-full rounded object-cover mb-3" alt="SnapSolve instructions." />
                <h3 className='font-bold text-2xl text-blackMain uppercase'>Get AI Solutions</h3>
                <p className="font-semibold text-blackMain/60 text-base">The AI provides proper answers to the questions identified on the image.</p>
            </div>
        </div>
        <div className="flex flex-wrap flex-col md:flex-row items-center justify-evenly py-4">
            <div className="flex flex-col items-start justify-center w-full md:w-[50%] my-4">
                <h4 className="font-bold text-6xl md:text-6xl lg:text-8xl">Easily Solve <br /> Challenges <br /> With <br />SnapSolve.</h4>
                <p className="text-base text-blackMain/50 py-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, quisquam velit aliquam consequuntur quam illum magni blanditiis dolores at.</p>
                <a href="#" className="text-whiteMain bg-purpleMain py-3 px-12 font-semibold rounded-md hover:shadow-xl">TRY FOR FREE</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-3 w-full md:w-[50%]">
                <div className="p-3 bg-whiteMain rounded-md flex flex-col items-start justify-evenly shadow-xl">
                    <FaRegEye className="font-bold text-petchMain text-2xl md:text-4xl" />
                    <h5 className="font-bold text-2xl md:text-3xl my-3">Image Recognition</h5>
                    <p className="text-base text-blackMain/50 font-semibold">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil tempora ipsa animi facilis autem pariatur? Officia sed, cumque maiores ut esse modi iure doloremque nobis..</p>
                </div>
                <div className="p-3 bg-whiteMain rounded-md flex flex-col items-start justify-evenly shadow-xl">
                    <TiMessageTyping className="font-bold text-petchMain text-2xl md:text-4xl" />
                    <h5 className="font-bold text-2xl md:text-3xl my-3">Text Recognition</h5>
                    <p className="text-base text-blackMain/50 font-semibold">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil tempora ipsa animi facilis autem pariatur? Officia sed, cumque maiores ut esse modi iure doloremque nobis..</p>
                </div>
                <div className="p-3 bg-whiteMain rounded-md flex flex-col items-start justify-evenly shadow-xl">
                    <RiAiGenerate className="font-bold text-petchMain text-2xl md:text-4xl" />
                    <h5 className="font-bold text-2xl md:text-3xl my-3">Text Generation</h5>
                    <p className="text-base text-blackMain/50 font-semibold">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil tempora ipsa animi facilis autem pariatur? Officia sed, cumque maiores ut esse modi iure doloremque nobis..</p>
                </div>
                <div className="p-3 bg-whiteMain rounded-md flex flex-col items-start justify-evenly shadow-xl">
                    <SiTeamspeak className="font-bold text-petchMain text-2xl md:text-4xl" />
                    <h5 className="font-bold text-2xl md:text-3xl my-3">Human Interaction</h5>
                    <p className="text-base text-blackMain/50 font-semibold">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil tempora ipsa animi facilis autem pariatur? Officia sed, cumque maiores ut esse modi iure doloremque nobis..</p>
                </div>
            </div>
        </div>
    </section> 
)};
 
export default HowItWorks;