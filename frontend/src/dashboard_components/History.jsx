import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

const History = () => {
    const [chatHistory, setChatHistory] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchChatHistory = async () => {
          try {
              // Retrieve the token from localStorage
              const token = localStorage.getItem('token');
  
              if (!token) {
                  throw new Error('No token found in local storage');
              }
  
              const response = await fetch('http://localhost:8080/main/chat-history', {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}` // Send token in Authorization header
                  }
              });
  
              if (!response.ok) {
                  const errData = await response.json();
                  throw new Error(errData.error || 'Failed to fetch chat history');
              }
  
              const data = await response.json();
              console.log('Chat History:', data);
              setChatHistory(data);
          } catch (err) {
              setError(err.message);
          } finally {
              setLoading(false);
          }
      };
  
      fetchChatHistory();
  }, []);
  
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error: {error}</div>;
    }

    return ( 
        <div className="flex flex-col items-center justify-start w-full h-full">
            <Link to='/' className="font-bold text-3xl md:text-4xl lg:text-5xl">SnapSolve</Link>
            <div className="flex flex-col items-center justify-start my-5 w-full">
                <h4 className="text-center text-xl md:text-2xl lg:text-3xl">Chat History</h4>
                <div className="flex flex-col items-center justify-center w-full">
                {chatHistory.length > 0 ? (
                        <ul className="w-full">
                        {chatHistory
                          .filter(message => message.sender === "user")  // Only include messages from the user
                          .map((message, index) => (
                            <li 
                              key={index} 
                              className={`text-sm md:text-lg text-center bg-yellowMain/10 rounded-md my-2 cursor-pointer w-[90%] p-2`}
                            >
                              {message.message}
                            </li>
                          ))
                        }
                        </ul>
                    ) : (
                        <p>No chat history found</p>
                    )}
                </div>
            </div>
        </div>
     );
};
 
export default History;