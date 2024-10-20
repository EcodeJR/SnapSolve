import Drag_Drop from '../components/Drag_Drop';
import logo from '../assets/snapsolveLogo.png';
import gem_img from '../assets/gem_icon-nobg.png';
import { useState } from "react";

const Image = () => {
    const [conversation, setConversation] = useState([]); // Array to store the conversation history

   // Function to handle sending image to backend and updating conversation
   const handleSendImage = async (imgArray) => {
    if (imgArray.length === 0) return;

    const userMessage = { message: "Image sent" };
    const botResponse = { botResponse: "" };
    
    setConversation((prevConversation) => [...prevConversation, userMessage, botResponse]);

    try {
        const token = localStorage.getItem('token');
        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const formData = new FormData();
        formData.append('image', imgArray[0]); 

        const res = await fetch('http://localhost:8080/main/image', {
            method: 'POST',
            headers,
            body: formData,
        });

        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.error || 'Failed to upload image');
        }

        const data = await res.json();
        let msg = data.botResponse;

        const formatText = () => {
            if (!msg) return ''; 

            let formattedText = msg;
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

        setConversation((prevConversation) => {
            const updatedConversation = [...prevConversation];
            updatedConversation[updatedConversation.length - 1] = { botResponse: formatText() };
            return updatedConversation;
        });

    } catch (error) {
        console.error('Error:', error);
        const errorMessage = { message: 'Error communicating with server' };
        setConversation((prevConversation) => [...prevConversation, errorMessage]);
    }
};


  return ( 
    <div className='w-full h-full flex flex-col items-center justify-center'>
        <Drag_Drop handleClick={handleSendImage} />

        <section className="w-full h-fit flex flex-col items-center justify-center">
            { conversation.length === 0 ? ( 
                    <div className="flex items-center justify-center">
                        <img src={logo} alt="Snapsolves's Logo." draggable="true" className='w-[40px] md:w-[100px] lg:w-[200px]' />
                    </div>
                )
            :
                ( conversation.map((msg, index) => (
                        <div className="w-full md:w-[80%] mx-auto h-full p-5" key={index}>
                            {/* <div className="w-full h-fit flex items-center justify-end my-4">
                                <pre className="text-lg md:text-xl">{msg.sender === 'user' ? 'You' : 'AI'}</pre>
                            </div> */}
                            <div className="w-full h-fit flex items-start justify-start my-5">
                                <img src={gem_img} alt="Gemini Logo" className="w-10" />
                                {msg.message === "" ? null : <div className="p-2 rounded-md"><p className="text-base">{msg.message}</p></div>}
                                    {
                                        msg.botResponse === "" ? <p className="text-lg m-2">Generating......</p> : <div className="text-lg m-2" dangerouslySetInnerHTML={{ __html: msg.botResponse }}>
                                    </div>
                                }
                            </div>
                        </div>
                    ))
                )
            }
        </section>
    </div>
  );
};

export default Image;
