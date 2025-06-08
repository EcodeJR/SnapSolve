import { useState, useEffect } from 'react';
import { analyze } from '../utils/api';
import PropTypes from 'prop-types';
import logo from '../assets/snapsolveLogo.png';
// import ReactMarkdown from 'react-markdown';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const TextAnalysis = ({ darkMode, selectedChat, setHistoryUpdated }) => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const [error, setError] = useState(null);
    const [copyFeedback, setCopyFeedback] = useState('');

     // Effect to handle selected history item
useEffect(() => {
    if (selectedChat && selectedChat.type === 'analyze') { // Changed from 'analysis' to 'analyze'
        setText(selectedChat.textContent);
        setAnalysis({
            correctedText: selectedChat.correctedText,
            suggestions: selectedChat.suggestions
        });
    }
}, [selectedChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        setLoading(true);
        setError(null);
        
        try {
            const response = await analyze.analyzeText(text);
            setAnalysis(response);
            setHistoryUpdated(prev => !prev); // Trigger history update
        } catch (error) {
            console.error('Error:', error);
            setError(error.message || 'Failed to analyze text');
        } finally {
            setLoading(false);
        }
    };



        // Add copy handler function
    const handleCopyText = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopyFeedback('Copied!');
            setTimeout(() => setCopyFeedback(''), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
            setCopyFeedback('Failed to copy');
        }
    };

    const formatAnalyzedText = (text) => {
        if (!text) return '';

        // First handle LaTeX expressions
        let formattedText = text.replace(/\$\$(.*?)\$\$/g, (match, math) => {
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

        formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Convert list items
        formattedText = formattedText.replace(/^\* (.*?)(\n|$)/gm, '<li>$1</li>');

        // Wrap lists in <ul> tags
        formattedText = formattedText.replace(/(<li>.*<\/li>)+/g, '<ul class="list-disc pl-5 space-y-2">$&</ul>');
        
        // Convert line breaks
        formattedText = formattedText.replace(/\n/g, '<br />');

        return formattedText;
    };

    return (
        <div className={`w-full h-[calc(100vh-160px)] flex flex-col overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    {/* Input Form */}
                    <form onSubmit={handleSubmit} className="mb-8">
                        {error && (
                            <div className={`p-4 mb-4 rounded-lg border ${
                                darkMode 
                                    ? 'bg-red-900/20 border-red-800 text-red-200' 
                                    : 'bg-red-50 border-red-200 text-red-600'
                            }`}>
                                {error}
                            </div>
                        )}
                        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl shadow-sm p-4`}>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Enter text to analyze..."
                                className={`w-full h-32 p-2 mb-4 outline-none bg-transparent resize-none ${darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
                                disabled={loading}
                            />
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading || !text.trim()}
                                    className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                                        loading || !text.trim()
                                            ? `${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
                                            : 'bg-blue-500 text-white hover:bg-blue-600'
                                    }`}
                                >
                                    {loading ? 'Analyzing...' : 'Analyze'}
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Content Display */}
                    {!analysis && !loading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <img src={logo} alt="Logo" className="w-24 h-24 object-contain mb-6 animate-bounce-slow" />
                            <h2 className={`text-2xl font-bold mb-2 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                Text Analysis
                            </h2>
                            <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Get grammar, clarity, and style suggestions for your text.
                            </p>
                        </div>
                    ) : loading ? (
                        <div className={`flex items-center justify-center gap-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'} p-12`}>
                            <span className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"/>
                            <span className="text-lg">Analyzing your text...</span>
                        </div>
                    ) : analysis && (
            <div className="space-y-8">
                {/* Corrected Text */}
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm`}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            Corrected Text
                        </h3>
                        <div className="flex items-center gap-2">
                            {copyFeedback && (
                                <span className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                                    {copyFeedback}
                                </span>
                            )}
                            <button
                                onClick={() => handleCopyText(analysis.correctedText)}
                                className={`p-2 rounded-lg transition-colors ${
                                    darkMode 
                                        ? 'hover:bg-gray-700 text-gray-300' 
                                        : 'hover:bg-gray-100 text-gray-600'
                                }`}
                                title="Copy to clipboard"
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-5 w-5" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" 
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div 
                        className={`prose ${darkMode ? 'prose-invert text-gray-300' : 'text-gray-600'} max-w-none`}
                        dangerouslySetInnerHTML={{ 
                            __html: formatAnalyzedText(analysis.correctedText) 
                        }}
                    />
                </div>

                            {/* Suggestions */}
                            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm`}>
                                <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                    Suggestions
                                </h3>
                                <ul className="space-y-2">
                                    {analysis.suggestions.map((suggestion, i) => (
                                        <li key={i} className={`flex items-start gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                            <span className="mt-1.5 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"/>
                                            <span>{suggestion}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

TextAnalysis.propTypes = {
    darkMode: PropTypes.bool.isRequired,
    selectedChat: PropTypes.object,
    setHistoryUpdated: PropTypes.func.isRequired
};

export default TextAnalysis;