import { IoSend } from "react-icons/io5";
import gem_img from '../assets/gem_icon-nobg.png';
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import ScrollToTop from "../components/ScrollToTop";
import Cookies from 'js-cookie';
import logo from '../assets/snapsolveLogo.png';

const Chat = ({ selectedChat }) => {
    const [inputText, setInputText] = useState('');
    const [conversation, setConversation] = useState([]);

    // Function to format text
    const formatText = (msg) => {
        // Convert bolded text
        let formattedText = msg.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Convert list items (using regular expressions for markdown-like syntax)
        formattedText = formattedText.replace(/^\* (.*?)(\n|$)/gm, '<li>$1</li>');
        // Wrap <ul> around all <li> elements
        formattedText = formattedText.replace(/(<li>.*<\/li>)+/g, '<ul>$&</ul>');
        // Add <br /> tags for new lines
        formattedText = formattedText.replace(/\n/g, '<br />');
        return formattedText;
    };

    // Effect to re-render Chat component and update conversation when selectedChat changes
    useEffect(() => {
        if (selectedChat) {
            // Format the message and botResponse
            const formattedMessage = {
                message: selectedChat.message,
                botResponse: formatText(selectedChat.botResponse || '')
            };

            // Update the conversation with the selected chat
            setConversation([formattedMessage]);
        }
    }, [selectedChat]);

    // Function to handle sending new text (not related to history)
    const handleSendText = async () => {
        if (!inputText.trim()) return;
    
        const newMessage = { message: inputText };
        setConversation((prevConversation) => [...prevConversation, newMessage]);
    
        const botResponse = { botResponse: "" };
        setConversation((prevConversation) => [...prevConversation, botResponse]);
    
        try {
            const token = Cookies.get('token');
            const headers = {
                'Content-Type': 'application/json',
            };
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
    
            const res = await fetch('http://localhost:8080/main/chat', {
                method: 'POST',
                headers,
                body: JSON.stringify({ message: inputText }),
            });
    
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || 'Failed to send message');
            }
    
            const data = await res.json();
            let msg = data.botResponse;
    
            // Format the bot's response
            setConversation((prevConversation) => {
                const updatedConversation = [...prevConversation];
                updatedConversation[updatedConversation.length - 1] = { botResponse: formatText(msg) };
                return updatedConversation;
            });
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = { message: 'Error communicating with server' };
            setConversation((prevConversation) => [...prevConversation, errorMessage]);
        }
        setInputText('');
    };
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSendText();
        }
    };

    return ( 
        <section className="w-full min-h-[70vh] relative overflow-hidden flex flex-col items-center justify-between">
            <ScrollToTop />
            <section className="w-full h-full flex flex-col items-center justify-center">
                { conversation.length === 0 ? ( 
                        <div className="h-[50vh] w-full flex flex-col items-center justify-center p-5">
                            <img src={logo} alt="Snapsolves's Logo." draggable="true" className='w-[40px] md:w-[100px] lg:w-[200px]' />
                            <h1 className="text-xl font-bold text-center">Got a tricky question or equation?</h1>
                        </div> 
                    )
                :
                    conversation.map((msg, index) => (
                        <div className="w-full md:w-[80%] mx-auto h-full p-5" key={index}>
                            <div className="w-full h-fit flex flex-col items-start justify-start my-5">
                                <div className="w-full flex items-center justify-end">
                                    {msg.message && <div className="w-fit flex"><p className="text-lg p-2 rounded-md bg-greenMain/30">{msg.message}</p></div>}
                                </div>
                                <div className="flex items-start justify-start">
                                    <img src={gem_img} alt="Gemini Logo" className="w-10" />
                                {
                                    msg.botResponse === "" 
                                    ?  <p className="text-lg m-2">Generating......</p>
                                    :  <div className="text-lg m-2" dangerouslySetInnerHTML={{ __html: msg.botResponse }}></div>
                                }
                                </div>
                                
                                
                            </div>
                        </div>
                    ))
                }
            </section>

            <div className="w-full p-2 absoulte flex items-center justify-center bottom-0 left-0">
                <div className="w-[90vw] lg:w-[80vw] p-2 mx-auto flex items-center justify-between border-[2px] border-greenMain rounded-full overflow-hidden">
                    <input type="text" id="chat_box" placeholder="Ask Me Anything.." value={inputText}
                    onChange={(e) => setInputText(e.target.value)} onKeyDown={handleKeyDown} className="w-full p-3 text-lg outline-none rounded-full bg-transparent" />
                    <button className="flex items-center justify-center text-2xl font-bold bg-greenMain text-whiteMain h-full p-3 lg:p-5 rounded-full" onClick={handleSendText}>
                        <IoSend />
                    </button>
                </div>
            </div>
        </section>
    );
};

// Define the expected prop types for the Chat component
Chat.propTypes = {
    selectedChat: PropTypes.shape({
        message: PropTypes.string,
        botResponse: PropTypes.string,
    }),
};

export default Chat;