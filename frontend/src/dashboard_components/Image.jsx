import Drag_Drop from '../components/Drag_Drop';
import logo from '../assets/snapsolveLogo.png';
import gem_img from '../assets/gem_icon-nobg.png';
import { useState } from "react";
import { image } from '../utils/api';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import PropTypes from 'prop-types';

const Image = ({ setHistoryUpdated, darkMode  }) => {
    const [conversation, setConversation] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [dragging, setDragging] = useState(false); // Add dragging state

    // Handle drag over event
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!dragging) setDragging(true);
    };

    // Handle drag leave event
    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    };

    // Handle drop event
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        
        const files = Array.from(e.dataTransfer.files);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        
        if (imageFiles.length > 0) {
            handleSendImage(imageFiles);
        }
    };

                // Format the bot's response text
            const formatText = (text) => {
                if (!text) return '';

                let formattedText = text;

                // Handle inline LaTeX expressions
                formattedText = formattedText.replace(/\$\$(.*?)\$\$/g, (match, math) => {
                    try {
                        return katex.renderToString(math, {
                            throwOnError: false,
                            displayMode: false,
                        });
                    } catch (error) {
                        console.log("Error rendering LaTeX--:", error);
                        return match;
                    }
                });

                // Format resource sections with links
                formattedText = formattedText.replace(
                    /^([\w\s]+) for Learning:\n/gm,
                    '<h3 class="text-lg font-bold mt-4 mb-2">$1 for Learning:</h3>\n'
                );

                // Format resource links with bullets
                formattedText = formattedText.replace(
                    /^([^*\n][^\n]+):\s*\n(\* \[(.*?)\]\((https?:\/\/[^\s)]+)\)[^\n]*\n?)+/gm,
                    (match, title, links) => {
                        const formattedLinks = links.split('\n').filter(Boolean).map(link => {
                            const linkMatch = link.match(/\* \[(.*?)\]\((https?:\/\/[^\s)]+)\)(.*)/);
                            if (linkMatch) {
                                const [, text, url, description] = linkMatch;
                                return `<li><a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${text}</a>${description || ''}</li>`;
                            }
                            return link;
                        }).join('\n');

                        return `<div class="mb-4">
                            <p class="font-medium">${title}:</p>
                            <ul class="list-disc pl-5 space-y-2">
                                ${formattedLinks}
                            </ul>
                        </div>`;
                    }
                );

                // Handle other existing formatting
                formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                formattedText = formattedText.replace(/^\* (.*?)(\n|$)/gm, '<li>$1</li>');
                formattedText = formattedText.replace(/(<li>.*<\/li>)+/g, '<ul>$&</ul>');
                formattedText = formattedText.replace(/\n/g, '<br />');
                formattedText = formattedText.replace(/```(.*?)```/gs, (match, code) => {
                    const escapedCode = code.replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&#39;')
                        .replace(/\n/g, '<br>')
                        .replace(/\s/g, '&nbsp;');
                    return `<pre><code>${escapedCode}</code></pre>`;
                });

                return formattedText;
            };

   // Function to handle sending image to backend and updating conversation


    const handleSendImage = async (imgArray) => {
        if (imgArray.length === 0) return;

        const userMessage = { message: "Image sent", botResponse: "" };
        setConversation(prev => [...prev, userMessage]);
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('image', imgArray[0]);

            const data = await image.uploadImage(formData);
            
            // Update bot's response and reset loading
            setConversation(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                    ...updated[updated.length - 1],
                    botResponse: formatText(data.botResponse),
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
        }
    };


    return ( 
        <div className={`w-full h-[calc(100vh-160px)] flex flex-col overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* Scrollable container */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    {/* Drag & Drop Area */}
                    <div
                        className={`relative w-full aspect-video rounded-2xl transition-all duration-300 py-3 
                        ${dragging 
                            ? darkMode ? 'bg-blue-900/20 border-blue-500' : 'bg-blue-50 border-blue-400'
                            : darkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500 hover:bg-blue-900/20' : 'bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                        } border-2 border-dashed`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <Drag_Drop handleClick={handleSendImage} darkMode={darkMode} />
                    </div>

                    {/* Conversation Section */}
                    <section className="mt-4">
                        {conversation.length === 0 ? ( 
                            <div className="flex flex-col items-center justify-center py-6">
                                <img 
                                    src={logo} 
                                    alt="Snapsolve's Logo" 
                                    className='w-24 md:w-32 lg:w-40 animate-pulse' 
                                />
                                <p className={`mt-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-lg text-center`}>
                                    Upload an image to get step-by-step solutions and explanations to all problems and questions.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {conversation.map((msg, index) => (
                                    <div key={index} className="fade-in">
                                        {msg.message && (
                                            <div className="flex justify-end mb-4">
                                                <div className={`${darkMode ? 'bg-blue-600' : 'bg-green-500'} text-white px-4 py-2 rounded-2xl shadow-sm max-w-[80%]`}>
                                                    <p className="text-base md:text-lg">{msg.message}</p>
                                                </div>
                                            </div>
                                        )}
                                        
                                        <div className="flex items-start gap-3">
                                            <div className={`w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 ${darkMode ? 'border-gray-700' : 'border-blue-100'} shadow-sm`}>
                                                <img 
                                                    src={gem_img} 
                                                    alt="Gemini AI" 
                                                    className="w-full h-full object-cover" 
                                                />
                                            </div>
                                            {loading && msg.botResponse === "" ? (
                                                <div className={`flex items-center justify-center gap-3 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'} p-4 rounded-2xl shadow-sm`}>
                                                    <span className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"/>
                                                    <span className="text-lg">Thinking...</span>
                                                </div>
                                            ) : (
                                                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-2xl shadow-sm max-w-[80%]`}>
                                                    <div 
                                                        className={`prose prose-lg ${darkMode ? 'prose-invert text-gray-300' : 'prose-blue text-gray-700'} max-w-none`}
                                                        dangerouslySetInnerHTML={{ __html: msg.botResponse }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};


// Define the expected prop types for the Image component
Image.propTypes = {
    setHistoryUpdated: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired,
};

export default Image;
