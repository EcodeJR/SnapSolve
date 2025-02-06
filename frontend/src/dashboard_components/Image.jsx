import Drag_Drop from '../components/Drag_Drop';
import logo from '../assets/snapsolveLogo.png';
import gem_img from '../assets/gem_icon-nobg.png';
import { useState } from "react";
import Cookies from 'js-cookie';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import PropTypes from 'prop-types';

const Image = ({ setHistoryUpdated }) => {
    const [conversation, setConversation] = useState([]); // Array to store the conversation history
    const [loading, setLoading] = useState(false);


   // Function to handle sending image to backend and updating conversation
    const handleSendImage = async (imgArray) => {
        if (imgArray.length === 0) return;

        const userMessage = { message: "Image sent", botResponse: "" };
        setConversation((prevConversation) => [...prevConversation, userMessage]);
        setLoading(true); // Set loading to true to show "Generating..."

        try {
            const token = Cookies.get('token');
            const headers = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const formData = new FormData();
            formData.append('image', imgArray[0]);

            const res = await fetch('https://snap-solve-nine.vercel.app/main/image', { //localhost:8080
                method: 'POST',
                headers,
                body: formData,
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || 'Failed to upload image');
            }

            const data = await res.json();
            const msg = data.botResponse;

            // Format the bot's response text
            const formatText = () => {
                if (!msg) return '';

                let formattedText = msg;

                // Handle inline LaTeX expressions
                formattedText = formattedText.replace(/\$\$(.*?)\$\$/g, (match, math) => {
                    try {
                        // Render LaTeX using KaTeX
                        return katex.renderToString(math, {
                            throwOnError: false,
                            displayMode: false,
                        });
                    } catch (error) {
                        console.error("Error rendering LaTeX:", error);
                        return match;
                    }
                });

                // Handle other formatting (bold, lists, etc.)
                formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                formattedText = formattedText.replace(/^\* (.*?)(\n|$)/gm, '<li>$1</li>');
                formattedText = formattedText.replace(/(<li>.*<\/li>)+/g, '<ul>$&</ul>');
                formattedText = formattedText.replace(/\n/g, '<br />');
                formattedText = formattedText.replace(/```(.*?)```/gs, (match, code) => {
                    const escapedCode = code.replace(/&/g, '&amp;').replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
                        .replace(/\n/g, '<br>').replace(/\s/g, '&nbsp;');
                    return `<pre><code>${escapedCode}</code></pre>`;
                });

                return formattedText;
            };


            // Update bot's response and reset loading
            setConversation((prevConversation) => {
                const updatedConversation = [...prevConversation];
                updatedConversation[updatedConversation.length - 1] = {
                    ...updatedConversation[updatedConversation.length - 1],
                    botResponse: formatText(),
                };
                return updatedConversation;
            });

            // Trigger the re-render of History.jsx
            setHistoryUpdated((prev) => !prev); // Toggle the value to trigger useEffect in History

            setLoading(false); // Reset loading after response
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = { message: 'Error communicating with server' };
            setConversation((prevConversation) => [...prevConversation, errorMessage]);
            setLoading(false);
        }
    };



  return ( 
    <div className='w-full h-full flex flex-col items-center justify-center'>
        <Drag_Drop handleClick={handleSendImage} />

        <section className="w-full h-fit flex flex-col items-center justify-center">
            { conversation.length === 0 ? ( 
                    <div className="flex items-center justify-center">
                        <img src={logo} alt="Snapsolves's Logo." draggable="true" className='w-[100px] md:w-[150px] lg:w-[200px]' />
                    </div>
                )
            :
                ( conversation.map((msg, index) => (
                        <div className="w-full md:w-[80%] mx-auto h-full p-5" key={index}>
                            <div className="w-full h-fit flex flex-col items-start justify-start my-5">
                                
                            <div className="w-full flex items-center justify-end">
                                    {msg.message && <div className="w-fit flex"><p className="text-lg p-2 rounded-md bg-greenMain/30">{msg.message}</p></div>}
                                </div>
                                    
                                <div className="flex items-start justify-start">
                                    <img src={gem_img} alt="Gemini Logo" className="w-10" />
                                    {loading && msg.botResponse === "" ? (
                                        <div className='w-full h-fit flex items-center justify-center text-xl'><span className="w-[30px] h-[30px] rounded-full bg-transparent border-[2px] border-blueMain border-dashed animate-spin duration-75 mx-2"></span>Generating</div>
                                    ) : (
                                        <div className="text-lg m-2" dangerouslySetInnerHTML={{ __html: msg.botResponse }}></div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )
            }
        </section>
    </div>
  );
};


// Define the expected prop types for the Image component
Image.propTypes = {
    setHistoryUpdated: PropTypes.func.isRequired,
};

export default Image;
