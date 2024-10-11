import { useEffect, useState } from "react";
import Chat from "../dashboard_components/Chat";
import Image from "../dashboard_components/Image";
import History from "../dashboard_components/History";
import { Link } from "react-router-dom";
import { IoMdMoon } from "react-icons/io";
import { MdSunny } from "react-icons/md";

const Dashboard = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [chatVisible, setChatVisible] = useState(false); // Control visibility of the chat
    const [username, setUsername] = useState("");
    const [selectedChat, setSelectedChat] = useState(null); // Store the selected chat history

    // Handle logout: Clear the username from state and localStorage
    const handleLogout = () => {
        setUsername(''); // Clear the username from state
        localStorage.removeItem('username'); // Remove username from localStorage
        localStorage.removeItem('token');
    };

    useEffect(() => {
        const user = localStorage.getItem("username");
        setUsername(user);
    }, [username]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        localStorage.setItem('darkMode', darkMode);
    };

    const toggleChat = () => {
        setChatVisible(true); // Show the chat component
    };

    const toggleImage = () => {
        setChatVisible(false); // Show the image component
    };

    return (
        <section
            className={darkMode
                ? `bg-blackMain text-whiteMain h-screen fixed top-0 left-0 overflow-hidden w-full flex`
                : `bg-whiteMain text-blackMain h-screen fixed top-0 left-0 overflow-hidden w-full flex`
            }
        >
            <div className="w-full lg:w-[30vw] h-screen p-5 overflow-y-scroll">
                <History onSelectChat={(chat) => {
                    setSelectedChat(chat); // Set selected chat history
                    setChatVisible(true);  // Ensure Chat is visible when a chat is selected
                }} />
            </div>
            <div className="w-full h-full p-5 overflow-y-scroll">
                <div className="flex items-center justify-between p-2">
                    <h5 className="font-semibold text-base md:text-lg lg:text-lg">
                        {username == null ? `Hey Explorer, Welcome` : `Hey ${username}, Welcome`}
                    </h5>
                    <div className="flex items-center justify-center">
                        <button onClick={toggleDarkMode} className="px-2">
                            {darkMode
                                ? <MdSunny className="font-bold text-2xl md:text-3xl" />
                                : <IoMdMoon className="font-bold text-2xl md:text-3xl" />
                            }
                        </button>
                        {username == null
                            ? <Link to='/signin' className="px-4 py-2 bg-greenMain text-whiteMain rounded hover:shadow-md">Login</Link>
                            : <button onClick={handleLogout} className="px-4 py-2 bg-redMain font-bold text-whiteMain rounded hover:shadow-md">Logout</button>
                        }
                    </div>
                </div>
                <div className={`mx-auto my-3 flex items-center justify-around w-fit border-[1px] ${darkMode ? `border-whiteMain` : `border-blackMain`} backdrop-blur-lg rounded-full`}>
                    <button
                        onClick={toggleImage}
                        className={
                            darkMode && !chatVisible
                                ? `bg-whiteMain text-blackMain font-bold rounded-full text-lg py-2 px-5 m-1`
                                : !darkMode && !chatVisible
                                ? `bg-blackMain/90 text-whiteMain font-bold rounded-full text-lg py-2 px-5 m-1`
                                : `${darkMode ? `text-whiteMain` : `text-blackMain`} font-bold rounded-md text-lg py-3 px-5 mx-2`
                        }>
                        IMAGE
                    </button>

                    <button
                        onClick={toggleChat}
                        className={
                            darkMode && chatVisible
                                ? `bg-whiteMain text-blackMain font-bold rounded-full text-lg py-2 px-5 m-1`
                                : !darkMode && chatVisible
                                ? `bg-blackMain/90 text-whiteMain font-bold rounded-full text-lg py-2 px-5 m-1`
                                : `${darkMode ? `text-whiteMain` : `text-blackMain`} font-bold rounded-md text-lg py-3 px-5 mx-2`
                        }>
                        CHAT
                    </button>
                </div>
                <div className="w-full h-fit">
                    {/* Conditionally render Chat or Image based on user selection */}
                    {chatVisible
                        ? <Chat selectedChat={selectedChat} />
                        : <Image />
                    }
                </div>
            </div>
        </section>
    );
};

export default Dashboard;