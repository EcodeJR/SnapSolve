import { useState, useEffect } from 'react';
import { studyGuide } from '../utils/api';
import PropTypes from 'prop-types';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// import gem_img from '../assets/gem_icon-nobg.png';
import logo from '../assets/snapsolveLogo.png';
// import ReactMarkdown from 'react-markdown';

const StudyGuide = ({ darkMode, selectedChat, setHistoryUpdated }) => {
    const [topic, setTopic] = useState('');
    const [loading, setLoading] = useState(false);
    const [guide, setGuide] = useState(null);
    const [error, setError] = useState(null);

        // Effect to handle selected history item
    useEffect(() => {
        if (selectedChat && selectedChat.type === 'study') {
            setTopic(selectedChat.topic);
            setGuide({
                topic: selectedChat.topic,
                studyNotes: selectedChat.studyNotes,
                resources: selectedChat.resources,
                quiz: selectedChat.quiz
            });
        }
    }, [selectedChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!topic.trim()) return;

        setLoading(true);
        setError(null);
        try {
            const response = await studyGuide.generateGuide(topic);
            setGuide(response.guide);
           setHistoryUpdated(prev => !prev); // Trigger history update 
           console.log(response.guide);
        } catch (error) {
            console.error('Error:', error);
            setError(error.message || 'Failed to generate study guide');
        } finally {
            setLoading(false);
            
        }
    };


    const formatStudyNotes = (notes) => {
        // First handle LaTeX expressions
        let formattedText = notes.replace(/\$\$(.*?)\$\$/g, (match, math) => {
            try {
                return katex.renderToString(math, {
                    throwOnError: false,
                    displayMode: false,
                });
            } catch (error) {
                console.error("Error rendering LaTeX:", error);
                return match;
            }
        });

        // Convert markdown-style formatting
        formattedText = formattedText
            // Bold text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Bullet points
            .replace(/^\* (.*?)(\n|$)/gm, '<li>$1</li>')
            // URLs
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">$1</a>');

        // Wrap lists in <ul> tags
        formattedText = formattedText.replace(/(<li>.*<\/li>)+/g, '<ul class="list-disc pl-5 space-y-2">$&</ul>');
        
        // Convert line breaks
        formattedText = formattedText.replace(/\n/g, '<br />');

        return formattedText;
    };

const formatResources = (resources) => {
    return resources.map(resource => {
        // Match pattern: Resource: **Name (url):** Description
        const resourceMatch = resource.match(/Resource:\s*\*\*(.*?)\s*\((.*?)\):\*\*\s*(.*)/);
        if (resourceMatch) {
            const [, title, url, description] = resourceMatch;
            return {
                title: title.trim(),
                text: description.trim(),
                url: url.trim().startsWith('www.') ? `https://${url.trim()}` : url.trim()
            };
        }

        // Fallback for other formats
        const linkMatch = resource.match(/\[(.*?)\]\((.*?)\)(.*)$/);
        if (linkMatch) {
            const [, title, url, description] = linkMatch;
            return {
                title: title.trim(),
                text: description ? description.trim() : title.trim(),
                url: url.trim()
            };
        }

        // Handle plain text resources
        return { 
            title: "Resource",
            text: resource.trim(),
            url: null 
        };
    }).filter(Boolean);
};

// Update the tailwind config to include styles for generated content

    // Define markdown components with proper styling
    // const markdownComponents = {
    //     p: ({children}) => (
    //         <p className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-4`}>
    //             {children}
    //         </p>
    //     ),
    //     h1: ({children}) => (
    //         <h1 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-2xl font-bold mb-4`}>
    //             {children}
    //         </h1>
    //     ),
    //     h2: ({children}) => (
    //         <h2 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-xl font-bold mb-3`}>
    //             {children}
    //         </h2>
    //     ),
    //     ul: ({children}) => (
    //         <ul className="space-y-2 mb-4">
    //             {children}
    //         </ul>
    //     ),
    //     li: ({children}) => (
    //         <li className={`flex items-start gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
    //             <span className="mt-2 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"/>
    //             <span>{children}</span>
    //         </li>
    //     ),
    //     strong: ({children}) => (
    //         <strong className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
    //             {children}
    //         </strong>
    //     )
    // };



    return (
        <div className={`w-full h-[calc(100vh-160px)] flex flex-col overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    {/* Input Section */}
                    <form onSubmit={handleSubmit} className="mb-8">
                            {error && (
                                <div className={`p-4 mb-8 rounded-lg border ${
                                    darkMode 
                                        ? 'bg-red-900/20 border-red-800 text-red-200' 
                                        : 'bg-red-50 border-red-200 text-red-600'
                                }`}>
                                    {error}
                                </div>
                            )}
                        <div className={`flex items-center gap-4 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl shadow-sm p-4`}>
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="Enter a topic to generate a study guide..."
                                className={`flex-1 p-2 outline-none bg-transparent ${darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
                                disabled={loading}
                            />
                            <button
                                type="submit"
                                disabled={loading || !topic.trim()}
                                className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                                    loading || !topic.trim()
                                        ? `${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                            >
                                {loading ? 'Generating...' : 'Generate'}
                            </button>
                        </div>
                    </form>

                    {/* Content Display */}
                    {!guide && !loading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <img src={logo} alt="Logo" className="w-24 h-24 object-contain mb-6 animate-bounce-slow" />
                            <h2 className={`text-2xl font-bold mb-2 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                Generate a Study Guide
                            </h2>
                            <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Enter any topic to get a comprehensive study guide with notes, resources, and quiz questions.
                            </p>
                        </div>
                    ) : loading ? (
                        <div className={`flex items-center justify-center gap-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'} p-12`}>
                            <span className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"/>
                            <span className="text-lg">Creating your study guide...</span>
                        </div>
                    ) : guide && (
                        <div className="space-y-8">
                            {/* Study Notes */}
                            <div className={`${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'} rounded-xl p-6 shadow-sm`}>
                                <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                    Study Notes
                                </h3>
                                <div 
                                    className={`prose ${darkMode ? 'prose-invert' : ''} max-w-none`}
                                    dangerouslySetInnerHTML={{ 
                                        __html: formatStudyNotes(guide.studyNotes) 
                                    }}
                                />
                            </div>

                            {/* Resources */}
                            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm`}>
                                <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                    Resources
                                </h3>
 <ul className="space-y-3">
    {formatResources(guide.resources).map((resource, i) => (
        <li 
            key={i} 
            className={`flex items-start gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
        >
            <span className="mt-2 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"/>
            <div>
                <span className="font-medium">{resource.title}: </span>
                {resource.url ? (
                    <>
                        <a 
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            Visit Resource
                        </a>
                        {resource.text && (
                            <span className="ml-2">- {resource.text}</span>
                        )}
                    </>
                ) : (
                    resource.text
                )}
            </div>
        </li>
    ))}
</ul>
                            </div>

                            {/* Quiz */}
                            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm`}>
                                <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                    Practice Quiz
                                </h3>
                                <div className="space-y-6">
                                    {guide.quiz.map((q, i) => (
                                        <div key={i} className="space-y-3">
                                            <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                                {i + 1}. {q.question}
                                            </p>
                                            <ul className="space-y-2 pl-6">
                                                {q.options.map((option, j) => (
                                                    <li key={j} className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                                                        {['A', 'B', 'C'][j]}) {option}
                                                    </li>
                                                ))}
                                            </ul>
                                            <p className={`mt-2 font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                                                Answer: {q.correctAnswer}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

StudyGuide.propTypes = {
    darkMode: PropTypes.bool.isRequired,
    selectedChat: PropTypes.object,
    setHistoryUpdated: PropTypes.func.isRequired
};

export default StudyGuide;