import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { chat, analyze, studyGuide } from '../utils/api';
import { IoTrashOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const History = ({ onSelectChat, historyUpdated, darkMode }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null);

    useEffect(() => {
        fetchHistory();
    }, [historyUpdated]);

const fetchHistory = async () => {
    setLoading(true);
    try {
        const [chatHistory, analysisHistory, studyHistory] = await Promise.all([
            chat.getHistory(),
            analyze.getHistory(),
            studyGuide.getHistory()
        ]);

        const allHistory = [
            ...chatHistory.map(item => ({ ...item, type: 'chat' })),
            ...analysisHistory.map(item => ({ ...item, type: 'analyze' })),
            ...studyHistory.map(item => ({ ...item, type: 'study' }))
        ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setHistory(allHistory);
        setError(null);
    } catch (error) {
        if (error.response?.status === 401 || error.message.includes('No authentication token')) {
            setError(
                <div className="text-center">
                    <p className="mb-4">Sign in to access your history</p>
                    <div className="flex justify-center gap-4">
                        <Link 
                            to="/signin" 
                            className={`px-4 py-2 rounded-lg ${
                                darkMode 
                                    ? 'bg-blue-600 hover:bg-blue-700' 
                                    : 'bg-blue-500 hover:bg-blue-600'
                            } text-white transition-colors`}
                        >
                            Sign In
                        </Link>
                        <Link 
                            to="/signup" 
                            className={`px-4 py-2 rounded-lg ${
                                darkMode 
                                    ? 'bg-green-600 hover:bg-green-700' 
                                    : 'bg-green-500 hover:bg-green-600'
                            } text-white transition-colors`}
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            );
        } else {
            setError(error.message);
        }
    } finally {
        setLoading(false);
    }
};

const handleDeleteClick = (e, item) => {
        e.stopPropagation();
        setItemToDelete(item);
};

    const handleDelete = async () => {
        if (!itemToDelete) return;

        try {
            switch (itemToDelete.type) {
                case 'chat':
                    await chat.deleteMessage(itemToDelete._id);
                    break;
                case 'analyze':
                    await analyze.deleteAnalysis(itemToDelete._id);
                    break;
                case 'study':
                    await studyGuide.deleteGuide(itemToDelete._id);
                    break;
            }
            setItemToDelete(null);
            fetchHistory();
        } catch (error) {
            console.error('Delete error:', error);
        }
    };


    // Add confirmation dialog component
    const DeleteConfirmation = () => {
        if (!itemToDelete) return null;

        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className={`${
                    darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                } p-6 rounded-lg shadow-xl max-w-sm w-full mx-4`}>
                    <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
                    <p className="mb-6">Are you sure you want to delete this item? This action cannot be undone.</p>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setItemToDelete(null)}
                            className={`px-4 py-2 rounded-lg ${
                                darkMode 
                                    ? 'bg-gray-700 hover:bg-gray-600' 
                                    : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const renderHistoryItem = (item) => {
        const getItemPreview = () => {
            switch (item.type) {
                case 'chat':
                    return item.message?.substring(0, 100) || '';
                case 'analyze':
                    return item.textContent?.substring(0, 100) || '';
                case 'study':
                    return item.topic?.substring(0, 100) || '';
                default:
                    return 'Unknown item';
            }
        };

        return (
            <div 
                key={item._id}
                className={`group cursor-pointer p-4 rounded-lg transition-all duration-200 ${
                    darkMode 
                        ? 'hover:bg-gray-800 text-gray-300' 
                        : 'hover:bg-gray-100 text-gray-600'
                }`}
                onClick={() => onSelectChat(item)}
            >
                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0"> {/* Add min-w-0 to allow truncation */}
                        <div className="flex items-center gap-2 mb-1">
                            <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded ${
                                item.type === 'chat' 
                                    ? 'bg-blue-100 text-blue-700' 
                                    : item.type === 'analyze'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-purple-100 text-purple-700'
                            }`}>
                                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                            </span>
                            <p className="text-sm truncate">
                                {getItemPreview()}
                            </p>
                        </div>
                        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <button
                    onClick={(e) => handleDeleteClick(e, item)}
                    className={`flex-shrink-0 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 rounded-lg ${
                        darkMode 
                            ? 'hover:bg-gray-700 text-red-400 hover:text-red-300' 
                            : 'hover:bg-gray-200 text-red-500 hover:text-red-600'
                    }`}
                >
                    <IoTrashOutline />
                </button>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-4 max-h-full overflow-hidden flex flex-col">
            <Link to='/' className='group flex items-center space-x-2 my-8 flex-shrink-0'>
                <span className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center ${
                    darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                    SnapSolve
                </span>
            </Link>
            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} flex-shrink-0`}>
                History
            </h2>
            <div className="flex-1 overflow-y-auto min-h-0"> {/* Add min-h-0 to allow scrolling */}
                {loading ? (
                    <div className="flex justify-center">
                        <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${
                            darkMode ? 'border-gray-300' : 'border-gray-800'
                        }`}></div>
                    </div>
                ) : error ? (
                    <div className={`p-6 rounded-lg ${
                        darkMode ? 'bg-gray-800' : 'bg-gray-100'
                    }`}>
                        {error}
                    </div>
                ) : history.length === 0 ? (
                    <div className={`text-center ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                        No history found
                    </div>
                ) : (
                    <div className="space-y-2">
                        {history.map(item => renderHistoryItem(item))}
                    </div>
                )}
            </div>
            {itemToDelete && <DeleteConfirmation />}
        </div>
    );
};

History.propTypes = {
    onSelectChat: PropTypes.func.isRequired,
    historyUpdated: PropTypes.bool,
    darkMode: PropTypes.bool
};

export default History;