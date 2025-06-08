import { IoSend, IoCopyOutline, IoTrashOutline } from "react-icons/io5";
import gem_img from '../assets/gem_icon-nobg.png';
import { useState, useEffect,useRef } from "react";
import PropTypes from 'prop-types';
import logo from '../assets/snapsolveLogo.png';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { chat } from '../utils/api';


const Chat = ({ selectedChat, setHistoryUpdated, darkMode }) => {
    const [inputText, setInputText] = useState('');
    const [conversation, setConversation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const chatEndRef = useRef(null);

    const handleCopy = async (text) => {
        try {
            const strippedText = text.replace(/<[^>]+>/g, '');
            await navigator.clipboard.writeText(strippedText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const clearChat = () => {
        setConversation([]);
    };

    // Scroll to bottom on new messages
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversation]);

    // Function to format text
    const formatText = (msg) => {
        // Convert bolded text
        let formattedText = msg.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

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

        const newMessage = { message: inputText, botResponse: "" };
        setConversation(prev => [...prev, newMessage]);
        setLoading(true);

        try {
            const data = await chat.sendMessage(inputText);
            const msg = data.botResponse;

            setConversation(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                    ...updated[updated.length - 1],
                    botResponse: formatText(msg),
                };
                return updated;
            });

            setHistoryUpdated(prev => !prev);
        } catch (error) {
            console.error('Error:', error);
            setConversation(prev => [...prev, { 
                message: 'Error communicating with server' 
            }]);
        } finally {
            setLoading(false);
            setInputText('');
        }
    };

    
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSendText();
        }
    };

    {/*end------------------*/}
    return ( 
        <section className={`w-full h-[calc(100vh-160px)] flex flex-col relative ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* Header */}
            <div className={`sticky top-0 z-10 ${darkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-md shadow-sm border-b px-4 py-2`}>
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <h1 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        Chat with SnapSolve
                    </h1>
                    {conversation.length > 0 && (
                        <button
                            onClick={clearChat}
                            className="flex items-center gap-1 px-2 py-1 text-red-500 hover:bg-red-500/10 rounded-lg transition-all duration-300 text-sm"
                        >
                            <IoTrashOutline /> Clear Chat
                        </button>
                    )}
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto">
                <section className="max-w-4xl mx-auto p-4">
                    {conversation.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[calc(100vh-300px)]">
                            <img src={logo} alt="SnapSolve Logo" className="w-24 h-24 object-contain mb-6 animate-bounce-slow" />
                            <h2 className={`text-2xl font-bold mb-2 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                Welcome to SnapSolve Chat!
                            </h2>
                            <p className={`text-center max-w-md ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Ask me anything about math, science, or any academic topic. I`m here to help!
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {conversation.map((msg, index) => (
                                <div key={index} className="fade-in">
                                    {msg.message && (
                                        <div className="flex justify-end mb-4">
                                            <div className="bg-blue-500 text-white px-4 py-3 rounded-2xl rounded-tr-sm shadow-sm max-w-[80%]">
                                                <p className="text-base md:text-lg">{msg.message}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-start gap-4">
                                        <div className={`w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 ${darkMode ? 'border-gray-700' : 'border-blue-100'}`}>
                                            <img src={gem_img} alt="AI Assistant" className="w-full h-full object-cover" />
                                        </div>
                                        {loading && !msg.botResponse ? (
                                            <div className={`flex items-center gap-3 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'} p-4 rounded-2xl shadow-sm`}>
                                                <div className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
                                                <span>Thinking...</span>
                                            </div>
                                        ) : msg.botResponse ? (
                                            <div className={`group relative ${darkMode ? 'bg-gray-800 text-whiteMain' : 'bg-white'} p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 max-w-[85%]`}>
                                                <div className={`prose prose-lg ${darkMode ? 'prose-invert' : 'prose-blue'} max-w-none`}
                                                    dangerouslySetInnerHTML={{ __html: msg.botResponse }}
                                                />
                                                <button
                                                    onClick={() => handleCopy(msg.botResponse)}
                                                    className={`absolute top-4 right-4 p-2 ${darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                                    title={copied ? "Copied!" : "Copy to clipboard"}
                                                >
                                                    <IoCopyOutline className={copied ? "text-green-500" : ""} />
                                                </button>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>
                    )}
                </section>
            </div>

            {/* Input Section */}
            <div className={`sticky bottom-0 left-0 right-0 ${darkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-md p-4 border-t`}>
                <div className="max-w-4xl mx-auto">
                    <div className={`flex items-center gap-2 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-2`}>
                        <input
                            type="text"
                            placeholder="Ask me anything..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className={`flex-1 px-4 py-3 text-base outline-none bg-transparent ${darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
                            disabled={loading}
                        />
                        <button
                            onClick={handleSendText}
                            disabled={loading || !inputText.trim()}
                            className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300
                                ${loading || !inputText.trim() 
                                    ? `${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-400'} cursor-not-allowed` 
                                    : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg'}`}
                        >
                            <span className="hidden md:inline">Send</span>
                            <IoSend className={loading ? 'animate-pulse' : ''} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Update PropTypes
Chat.propTypes = {
    selectedChat: PropTypes.shape({
        message: PropTypes.string,
        botResponse: PropTypes.string,
    }),
    setHistoryUpdated: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired,
};

export default Chat;