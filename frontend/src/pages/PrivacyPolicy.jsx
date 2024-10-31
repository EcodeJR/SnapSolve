import Navigation from '../components/Navigation';
import Footer from "../components/Footer";
import { useEffect } from 'react';


const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return ( 
        <section className="w-full min-h-screen">
            <Navigation />
            <div className='w-full h-full p-6'>
                <h2 className="font-bold text-3xl md:text-5xl lg:text-7xl uppercase font-[Montserrat] tracking-wider">Privacy <br /> Policies</h2>
                {/* <p className='text-base italic opacity-40'>Effective Date: 01/11/2024</p> */}
                <p className='text-lg my-3 w-full md:w-[70%] text-justify'>At SnapSolve, we are committed to protecting your privacy and ensuring the security of your information. This Privacy Policy outlines how we collect, use, and protect the data you provide when using SnapSolve, including the uploading of images for AI-driven problem-solving.</p>
                <div>
                    <div className='w-full my-7 flex flex-col lg:flex-row items-start justify-start'>
                        <h3 className='w-full lg:w-[40vw] text-xl lg:text-2xl font-bold uppercase'>1. Information We Collect</h3>
                        <ul className='w-full lg:w-[50%] list-disc'>
                            <li className='text-lg font-normal text-justify'>
                                <p className='font-bold'>Uploaded Content:</p>
                                When you upload images of equations or mathematical problems, SnapSolve collects these images solely to process and provide accurate solutions.
                            </li>
                            <li className='text-lg font-normal text-justify'>
                                <p className='font-bold'>Usage Data:</p>
                                We may collect information on how you use SnapSolve, including page views, clicks, and interaction data. This data helps us improve our app and deliver a better user experience.
                                Device and Log Information: We may collect technical details about your device, browser, and IP address to enhance security and optimize app functionality.
                            </li>
                        </ul>
                    </div>

                    <div className='w-full my-7 flex flex-col lg:flex-row items-start justify-start'>
                        <h3 className='w-full lg:w-[40vw] text-xl lg:text-2xl font-bold uppercase'>2. How We Use Your Information</h3>
                        <ul className='w-full lg:w-[50%] list-disc'>
                            <li className='text-lg font-normal text-justify'>
                                <p className='font-bold'>Service Delivery:</p>
                                The images and data you upload are used solely for the purpose of analyzing and solving the equations or problems you submit. We do not use your content for any other purpose without your consent.
                            </li>
                            <li className='text-lg font-normal text-justify'>
                                <p className='font-bold'>Improvement of Services:</p>
                                SnapSolve may use aggregated data to improve our AI models, enhance features, and develop new services. This data is anonymized and cannot be traced back to individual users.
                            </li>
                            <li className='text-lg font-normal text-justify'>
                                <p className='font-bold'>Communication:</p>
                                We may use your contact information, if provided, to send important updates about SnapSolve, such as changes to this policy, security updates, and feature announcements.
                            </li>
                        </ul>
                    </div>


                    <div className='w-full my-7 flex flex-col lg:flex-row items-start justify-start'>
                        <h3 className='w-full lg:w-[40vw] text-xl lg:text-2xl font-bold uppercase'>3. Data Security</h3>
                        <div className='w-full lg:w-[50%]'>
                            <p className='text-lg font-normal text-justify'>
                                We implement industry-standard security measures to protect your information from unauthorized access, use, or disclosure. Uploaded images are securely stored and deleted after processing to prevent unauthorized access.
                                Sensitive user data (like login credentials, if applicable) is encrypted and securely stored in accordance with data protection standards.
                            </p>
                        </div>
                    </div>

                    <div className='w-full my-7 flex flex-col lg:flex-row items-start justify-start'>
                        <h3 className='w-full lg:w-[40vw] text-xl lg:text-2xl font-bold uppercase'>4. Third-Party Services</h3>
                        <div className='w-full lg:w-[50%]'>
                            <p className='text-lg font-normal text-justify'>
                                SnapSolve may work with third-party services to enhance our AI capabilities. Any third-party partners will adhere to strict data handling and privacy guidelines, ensuring that your information remains secure.
                            </p>
                        </div>
                    </div>

                    <div className='w-full my-7 flex flex-col lg:flex-row items-start justify-start'>
                        <h3 className='w-full lg:w-[40vw] text-xl lg:text-2xl font-bold uppercase'>5. Your Rights and Choices</h3>
                        <ul className='w-full lg:w-[50%] list-disc'>
                            <li className='text-lg font-normal text-justify'>
                                <p className='font-bold'>Data Access and Deletion:</p>
                                You have the right to access, update, or request deletion of any personal information SnapSolve may store about you.
                            </li>
                            <li className='text-lg font-normal text-justify'>
                                <p className='font-bold'>Opt-Out Options:</p>
                                You may limit certain types of data collection by adjusting your device or app settings or by contacting us directly.
                            </li>
                        </ul>
                    </div>

                    <div className='w-full my-7 flex flex-col lg:flex-row items-start justify-start'>
                        <h3 className='w-full lg:w-[40vw] text-xl lg:text-2xl font-bold uppercase'>6. Data Retention</h3>
                        <div className='w-full lg:w-[50%]'>
                            <p className='text-lg font-normal text-justify'>
                                SnapSolve retains personal information only as long as needed to fulfill the purposes outlined in this Privacy Policy, such as providing you with solutions to your submitted problems. Uploaded content (like images) is deleted shortly after processing.
                            </p>
                        </div>
                    </div>

                    <div className='w-full my-7 flex flex-col lg:flex-row items-start justify-start'>
                        <h3 className='w-full lg:w-[40vw] text-xl lg:text-2xl font-bold uppercase'>7. Children’s Privacy</h3>
                        <div className='w-full lg:w-[50%]'>
                            <p className='text-lg font-normal text-justify'>
                                SnapSolve is not intended for users under the age of 13. We do not knowingly collect or store personal information from children under 13 without parental consent. If we become aware of such data, we will promptly delete it.
                            </p>
                        </div>
                    </div>

                    <div className='w-full my-7 flex flex-col lg:flex-row items-start justify-start'>
                        <h3 className='w-full lg:w-[40vw] text-xl lg:text-2xl font-bold uppercase'>8. Policy Updates</h3>
                        <div className='w-full lg:w-[50%]'>
                            <p className='text-lg font-normal text-justify'>
                                SnapSolve may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. Users will be notified of any significant changes through the app or by email.
                            </p>
                        </div>
                    </div>

                    <div className='w-full my-7 flex flex-col lg:flex-row items-start justify-start'>
                        <h3 className='w-full lg:w-[40vw] text-xl lg:text-2xl font-bold uppercase'>9. Contact Us</h3>
                        <div className='w-full lg:w-[50%]'>
                            <p className='text-lg font-semibold text-justify'>
                                For questions or concerns about this Privacy Policy or how your data is handled, please reach out to us: <a className='text-blueMain font-bold' href="mailto:emmanueldcode@gmail.com">emmanueldcode@gmail.com</a>.
                            </p>
                        </div>
                    </div>


                </div>
                
            </div>
            <Footer />
        </section>
     );
}
 
export default PrivacyPolicy;