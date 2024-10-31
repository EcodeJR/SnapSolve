import Navigation from '../components/Navigation';
import Footer from "../components/Footer";
import { useEffect } from 'react';

const Rules = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return ( 
        <section className="w-full min-h-screen">
            <Navigation />
            <div className='w-full h-full p-4'>
                <h2 className="font-bold text-3xl md:text-5xl lg:text-7xl uppercase font-[Montserrat] tracking-wider">Community <br /> Guidelines</h2>
                <p className='text-lg my-3 w-full md:w-[70%] text-justify'>To maintain a constructive and safe environment for everyone, we ask all users to adhere to the following guidelines when using SnapSolve. By accessing SnapSolve, you agree to these terms.</p>
                <div>
                        <div className='w-full my-7 flex flex-col lg:flex-row items-start justify-start'>
                                <h3 className='w-full lg:w-[40vw] text-xl lg:text-2xl font-bold uppercase'>1. Respectful and Appropriate Content</h3>
                                <div className='w-full lg:w-[50%]'>
                                    <p className='text-lg font-normal text-justify'>
                                        Do not submit content that is offensive, obscene, or inappropriate. This includes language, images, or other materials that:
                                    </p>
                                    <ul className='text-lg font-normal list-disc'>
                                        <li>Are sexually explicit or contain nudity</li>
                                        <li>Are violent or promote harm</li>
                                        <li>Use hateful, racist, or discriminatory language</li>
                                    </ul>
                                </div>
                            </div>


                            <div className='w-full my-7 flex flex-col lg:flex-row items-start justify-start'>
                                <h3 className='w-full lg:w-[40vw] text-xl lg:text-2xl font-bold uppercase'>2. No Harassment or Abuse</h3>
                                <div className='w-full lg:w-[50%]'>
                                    <p className='text-lg font-normal text-justify'>
                                        Refrain from harassing, bullying, or intimidating behavior. SnapSolve is here to provide academic support and a helpful experience for all users, so please respect others and avoid offensive interactions.
                                    </p>
                                </div>
                            </div>

                            <div className='w-full my-7 flex flex-col lg:flex-row items-start justify-start'>
                                <h3 className='w-full lg:w-[40vw] text-xl lg:text-2xl font-bold uppercase'>3. Educational Purpose Only</h3>
                                <div className='w-full lg:w-[50%]'>
                                    <p className='text-lg font-normal text-justify'>
                                        Use SnapSolve solely for educational purposes. Uploading images or text unrelated to academic help or that attempt to manipulate the AI’s purpose can result in restricted access or account suspension.
                                    </p>
                                </div>
                            </div>

                            <div className='w-full my-7 flex flex-col lg:flex-row items-start justify-start'>
                                <h3 className='w-full lg:w-[40vw] text-xl lg:text-2xl font-bold uppercase'>4. No Misinformation or Malicious Content</h3>
                                <div className='w-full lg:w-[50%]'>
                                    <p className='text-lg font-normal text-justify'>
                                        Do not attempt to use SnapSolve to distribute false information or harmful content, including but not limited to:
                                    </p>
                                    <ul className='text-lg font-normal list-disc'>
                                        <li>False or manipulated information</li>
                                        <li>Viruses, malware, or other harmful code</li>
                                    </ul>
                                </div>
                            </div>

                            <div className='w-full my-7 flex flex-col lg:flex-row items-start justify-start'>
                                <h3 className='w-full lg:w-[40vw] text-xl lg:text-2xl font-bold uppercase'>5. Account Integrity</h3>
                                <div className='w-full lg:w-[50%]'>
                                    <p className='text-lg font-normal text-justify'>
                                        If SnapSolve requires account creation, keep your login credentials private, and do not impersonate others. Misuse of multiple accounts or impersonating someone else’s identity is prohibited.
                                    </p>
                                </div>
                            </div>

                            <div className='w-full my-7 flex flex-col lg:flex-row items-start justify-start'>
                                <h3 className='w-full lg:w-[40vw] text-xl lg:text-2xl font-bold uppercase'>6. Respect for AI and System Integrity</h3>
                                <div className='w-full lg:w-[50%]'>
                                    <p className='text-lg font-normal text-justify'>
                                        Do not attempt to bypass, overload, or interfere with the AI’s operation through excessive requests, reverse engineering, or unauthorized access attempts.
                                    </p>
                                </div>
                            </div>

                            <div className='w-full my-7 flex flex-col lg:flex-row items-start justify-start'>
                                <h3 className='w-full lg:w-[40vw] text-xl lg:text-2xl font-bold uppercase'>7. Prohibited Content</h3>
                                <div className='w-full lg:w-[50%]'>
                                    <p className='text-lg font-normal text-justify'>
                                        SnapSolve does not allow the use of any content that:
                                    </p>
                                    <ul className='text-lg font-normal list-disc'>
                                        <li>Promotes illegal activity</li>
                                        <li>Infringes on intellectual property rights</li>
                                        <li>Attempts to evade or mislead the AI’s educational focus</li>
                                        <li>Contains spam or advertising not related to educational purposes</li>
                                    </ul>
                                </div>
                            </div>

                            <div className='w-full my-7 flex flex-col lg:flex-row items-start justify-start'>
                                <h3 className='w-full lg:w-[40vw] text-xl lg:text-2xl font-bold uppercase'>8. Consequences for Violations</h3>
                                <div className='w-full lg:w-[50%]'>
                                    <p className='text-lg font-normal text-justify'>
                                        Violation of these guidelines may result in restricted access to SnapSolve, suspension of your account, or, in severe cases, a permanent ban from the platform.
                                    </p>
                                </div>
                            </div>


                            <div className='w-full my-7 flex flex-col lg:flex-row items-start justify-start'>
                                <h3 className='w-full lg:w-[40vw] text-xl lg:text-2xl font-bold uppercase'>Help Us Keep SnapSolve Safe and Supportive</h3>
                                <div className='w-full lg:w-[50%]'>
                                    <p className='text-lg text-justify font-bold'>
                                        If you encounter behavior or content that violates these rules, please report it to our team at <a className='text-blueMain font-bold' href="mailto:emmanueldcode@gmail.com">emmanueldcode@gmail.com</a>. <br />
                                        Thank you for helping us make SnapSolve a safe and constructive platform for everyone.
                                    </p>
                                </div>
                            </div>







                </div>
            </div>
            <Footer />
        </section>
     );
}
 
export default Rules;