import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CiWarning, CiTrash } from "react-icons/ci";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

const History = ({ onSelectChat, historyUpdated }) => {
    const [chatHistory, setChatHistory] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleteHistory, setDeleteHistory] = useState(false);
    const [selectedMessageId, setSelectedMessageId] = useState(null);  // New state to store the selected message ID

    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const token = Cookies.get('token');
                if (!token) throw new Error('Register or Signin to View History.');

                const response = await fetch('https://snap-solve-nine.vercel.app/main/chat-history', {
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
    }, [deleteHistory, historyUpdated]);

    const toggleDeleteHistory = (messageId) => {
        setSelectedMessageId(messageId);  // Set the selected message ID
        setDeleteHistory(!deleteHistory);
    };

    const deleteChatMessage = async (messageId) => {
        try {
            setLoading(true); // Set loading while deleting
            const token = Cookies.get('token');
            if (!token) throw new Error('Register or Signin to View History.');

            const response = await fetch(`https://snap-solve-nine.vercel.app/main/delete-history/${messageId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`  // Attach token for authorization
                }
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Failed to delete chat message');
            }

            // Remove the deleted message from the state
            setChatHistory((prevChatHistory) => prevChatHistory.filter(msg => msg._id !== messageId));

            // Close the delete confirmation modal after deletion
            toggleDeleteHistory();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); // Turn off loading after the operation
        }
    };

    let delHistory = 
        <div className={deleteHistory ? `absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 rounded-xl bg-whiteMain flex flex-col items-center justify-center p-5 w-[80%] md:w-[30%] h-[40%] md:h-[30%] shadow-xl` : `fixed -left-[100%]`}>
            <CiWarning className='text-4xl text-redMain font-bold animate-pulse' />
            <h2 className='py-4 font-bold text-2xl text-blackMain'>Do you wish to delete!</h2>
            <div className='w-full flex items-center justify-evenly'>
                <button onClick={() => deleteChatMessage(selectedMessageId)} className='py-2 px-6 text-lg font-bold bg-redMain rounded-md'>YES</button>
                <button onClick={() => toggleDeleteHistory()} className='py-2 px-6 text-lg font-bold bg-greenMain rounded-md'>NO</button>
            </div>
        </div>;

    return ( 
        <div className="flex flex-col items-center justify-start w-full h-fit scrollbar scrollbar-thumb-greenMain scrollbar-track-greenMain/10">
            {delHistory}
            <div className="flex flex-col items-center justify-start my-5 w-full">
                <Link to='/' className='text-3xl md:text-4xl lg:text-5xl my-3 font-bold text-center'>SnapSolve</Link>
                <h4 className="text-center text-xl md:text-2xl lg:text-3xl">Chat History</h4>
                <div className="flex flex-col items-center justify-center w-full p-3">
                    {loading ? <div className='w-full h-fit flex items-center justify-center text-xl py-10'><span className="w-[30px] h-[30px] rounded-full bg-transparent border-[2px] border-blueMain border-dashed animate-spin duration-75 mx-2"></span>Loading</div> 
                    : error ? (
                        <div className="flex flex-col items-center justify-center text-center text-redMain text-lg">
                            <p>{error}</p>
                        </div>
                    ) : chatHistory.length > 0 ? (
                        <ul className="w-full">
                            {chatHistory
                            .slice()
                            .reverse()
                            .map((message,  index) => (
                                <li 
                                    key={index} 
                                    className="text-sm md:text-lg text-center bg-greenMain/30 rounded-md my-2 mx-auto cursor-pointer w-[90%] p-2 flex items-center justify-between overflow-hidden relative"
                                    onClick={() => onSelectChat({ message: message.message, botResponse: message.botResponse })}
                                >
                                    <p className='w-fit'>
                                       {message.message} 
                                    </p>
                                    <div className='absolute top-[50%] translate-y-[-50%] right-2 bg-whiteMain rounded-full p-1'>
                                        <CiTrash 
                                        className='text-2xl font-bold text-redMain hover:animate-pulse' 
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering chat selection when deleting
                                            toggleDeleteHistory(message._id);
                                        }}  
                                    />
                                    </div>
                                    
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
    historyUpdated: PropTypes.bool.isRequired,
};

export default History;