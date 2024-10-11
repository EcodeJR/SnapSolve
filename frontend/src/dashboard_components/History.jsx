import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const History = ({ onSelectChat }) => {
    const [chatHistory, setChatHistory] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No token found in local storage');

                const response = await fetch('http://localhost:8080/main/chat-history', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    const errData = await response.json();
                    throw new Error(errData.error || 'Failed to fetch chat history');
                }

                const data = await response.json();
                setChatHistory(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchChatHistory();
    }, []);

    return ( 
        <div className="flex flex-col items-center justify-start w-full h-full">
            <div className="flex flex-col items-center justify-start my-5 w-full">
                <h4 className="text-center text-xl md:text-2xl lg:text-3xl">Chat History</h4>
                <div className="flex flex-col items-center justify-center w-full p-3">
                    {loading ? <div>Loading</div> 
                    : error ? (
                        <div className="flex flex-col items-center justify-center">
                            <p>Please login to see History</p>
                        </div>
                    ) : chatHistory.length > 0 ? (
                        <ul className="w-full">
                            {chatHistory.map((message,  index) => (
                                <li 
                                    key={index} 
                                    className="text-sm md:text-lg text-center bg-yellowMain/10 rounded-md my-2 cursor-pointer w-[90%] p-2"
                                    onClick={() => onSelectChat({ message: message.message, botResponse: message.botResponse })}
                                >
                                    {message.message}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No chat history found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

// Define the expected prop types for the History component
History.propTypes = {
    onSelectChat: PropTypes.func.isRequired,
};

export default History;
