import { useEffect, useState } from "react";
import Chat from "../dashboard_components/Chat";
import Image from "../dashboard_components/Image";
import History from "../dashboard_components/History";
import { Link, useNavigate } from "react-router-dom";
import { IoMdMoon } from "react-icons/io";
import { MdSunny } from "react-icons/md";
import { RiMenuFold4Line } from "react-icons/ri";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Cookies from 'js-cookie';
import StudyGuide from "../dashboard_components/StudyGuide";
import TextAnalysis from "../dashboard_components/TextAnalysis";

const Dashboard = () => {
    const [darkMode, setDarkMode] = useState(false);
    // const [chatVisible, setChatVisible] = useState(false); // Control visibility of the chat
    const [username, setUsername] = useState("");
    const [selectedChat, setSelectedChat] = useState(null); // Store the selected chat history
    const [showHistory, setShowHistory] = useState(false);
    const [historyUpdated, setHistoryUpdated] = useState(false); // New state to trigger History.jsx re-render
    const [mode, setMode] = useState('image'); // 'image', 'chat', 'study', 'analyze'

    // Handle logout: Clear the username from state and localStorage
    const handleLogout = () => {
        setUsername(''); // Clear the username from state
        Cookies.remove('token', { path: '/', secure: true, sameSite: 'Strict' });
        Cookies.remove('username', { path: '/', secure: true, sameSite: 'Strict' });
    };

    useEffect(() => {
        const user = Cookies.get('username');
        setUsername(user);
    }, [username]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        localStorage.setItem('darkMode', darkMode);
    };

    // const toggleChat = () => {
    //     setChatVisible(true); // Show the chat component
    // };

    // const toggleImage = () => {
    //     setChatVisible(false); // Show the image component
    // };
    const toggleHistoryBTN = () => {
        setShowHistory(!showHistory);
    }

    const navigate = useNavigate();

        const handleContactClick = (e) => {
        e.preventDefault();
        navigate('/');
        // Wait for navigation to complete then scroll
        setTimeout(() => {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 100);
    };

return (
    <section className={`h-screen w-full flex ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        
        {/* Sidebar/History Panel */}
        <aside className={`
            ${showHistory ? 'fixed inset-0 z-50' : 'hidden'} 
            lg:relative lg:block lg:w-[320px] 
            ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
            border-r border-gray-200
        `}>
            <div className="h-full overflow-hidden flex flex-col">
                {/* Mobile Close Button */}
                <button 
                    className="lg:hidden absolute top-4 right-4 p-4 text-red-500 hover:bg-red-50 rounded-full"
                    onClick={toggleHistoryBTN}
                >
                    <IoMdCloseCircleOutline className="text-4xl" />
                </button>
                
                <div className="flex-1 overflow-y-auto p-4">
                    <History 
                        onSelectChat={(item) => {
                            setSelectedChat(item);
                            setMode(item.type); // 'chat', 'analysis', or 'study'
                            setShowHistory(false);
                        }}
                        historyUpdated={historyUpdated}
                        darkMode={darkMode}
                        type={mode} // Pass the current mode
                    />
                </div>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden">
            {/* Top Navigation */}
            <nav className={`px-4 py-3 border-b ${darkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-md`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <button 
                            onClick={toggleHistoryBTN}
                            className={`lg:hidden p-2 hover:bg-gray-100 rounded-lg ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}
                        >
                            <RiMenuFold4Line className="text-2xl" />
                        </button>
                        <h5 className={`${"text-xs md:text-md"} 
                        ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>
                            {username ? `Hey ${username}, Welcome` : 'Hey Explorer, Welcome'}
                        </h5>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <button 
                            onClick={toggleDarkMode}
                            className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
                        >
                            {darkMode ? <MdSunny className="text-xl" /> : <IoMdMoon className="text-xl" />}
                        </button>
                        
                        {username ? (
                            <button 
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link 
                                to='/signin'
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mode Toggle */}
                <div className="flex justify-center mt-4 lg:mt-1">
    <div className={`inline-flex rounded-full p-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <button
            onClick={() => setMode('image')}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
                mode === 'image' ? 'bg-blue-500 text-white' : ''
            } ${darkMode ? 'text-whiteMain' : 'text-gray-900'}`}
        >
            IMAGE
        </button>
        <button
            onClick={() => setMode('chat')}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
                mode === 'chat' ? 'bg-blue-500 text-white' : ''
            } ${darkMode ? 'text-whiteMain' : 'text-gray-900'}`}
        >
            CHAT
        </button>
        <button
            onClick={() => setMode('study')}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
                mode === 'study' ? 'bg-blue-500 text-white' : ''
            } ${darkMode ? 'text-whiteMain' : 'text-gray-900'}`}
        >
            STUDY
        </button>
        <button
            onClick={() => setMode('analyze')}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
                mode === 'analyze' ? 'bg-blue-500 text-white' : ''
            } ${darkMode ? 'text-whiteMain' : 'text-gray-900'}`}
        >
            ANALYZE
        </button>
    </div>
</div>
            </nav>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden">
                {mode === 'chat' ? (
                    <Chat 
                        selectedChat={selectedChat} 
                        setHistoryUpdated={setHistoryUpdated}
                        darkMode={darkMode} 
                    />
                ) : mode === 'image' ? (
                    <Image 
                        setHistoryUpdated={setHistoryUpdated}
                        darkMode={darkMode}
                    />
                ) : mode === 'study' ? (
                    <StudyGuide 
                        darkMode={darkMode}
                        selectedChat={selectedChat}
                        setHistoryUpdated={setHistoryUpdated}
                    />
                ) : mode === 'analyze' ? ( // Changed from single parenthesis to ternary
                    <TextAnalysis 
                        darkMode={darkMode}
                        selectedChat={selectedChat}
                        setHistoryUpdated={setHistoryUpdated}
                    />
                ) : null}
            </div>

            {/* Footer */}
            <footer className={`py-2 text-center text-sm border-t ${darkMode ? 'bg-gray-900/80 border-gray-700 text-gray-300' : 'bg-white/80 border-gray-200 text-gray-600'} backdrop-blur-md`}>
                <p>
                    For Enquiries or Complaints. Contact us{' '}
                    <a 
                        href="/#contact" 
                        onClick={handleContactClick}
                        className="text-blue-500 hover:underline cursor-pointer"
                    >
                        HERE
                    </a>
                </p>
            </footer>
        </main>
    </section>
);
};

export default Dashboard;