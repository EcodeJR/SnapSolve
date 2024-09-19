import { IoSend } from "react-icons/io5";
import { RiMessage3Line } from "react-icons/ri";
import gem_img from '../assets/gem_icon-nobg.png';
import { useState } from "react";

const Chat = () => {
    const [inputText, setInputText] = useState(''); // Input text from user
    const [conversation, setConversation] = useState([]); // Array to store the conversation history

   // Function to handle sending text to backend and updating conversation
   const handleSendText = async () => {
    if (!inputText.trim()) return;

    const newMessage = { sender: 'user', message: inputText };
    setConversation((prevConversation) => [...prevConversation, newMessage]);

    const botResponse = { sender: 'bot', message: "" };
    setConversation((prevConversation) => [...prevConversation, botResponse]);

    try {
      const res = await fetch('http://localhost:8080/main/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputText }),
      });
      console.log(inputText)
      const data = await res.json();
      
      let msg = data.message;

      // Format the text returned from the API
      const formatText = () => {
        // Convert bolded text
        let formattedText = msg.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Convert list items (using regular expressions for markdown-like syntax)
        formattedText = formattedText.replace(/^\* (.*?)(\n|$)/gm, '<li>$1</li>');
        // Wrap <ul> around all <li> elements
        formattedText = formattedText.replace(/(<li>.*<\/li>)+/g, '<ul>$&</ul>');
        // Add <br /> tags for new lines
        formattedText = formattedText.replace(/\n/g, '<br />');
        
        return formattedText;
    }
    
    setConversation((prevConversation) => {
        const updatedConversation = [...prevConversation];
        updatedConversation[updatedConversation.length - 1] = { sender: 'AI', message: formatText() };
        return updatedConversation;
    });
      
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { sender: 'bot', message: 'Error communicating with server' };
      setConversation((prevConversation) => [...prevConversation, errorMessage]);
    }
    setInputText('');
  };

    return ( 
        <section className="w-full h-full flex flex-col items-center justify-between">
            <section className="w-full h-fit flex flex-col items-center justify-center">
                { conversation.length === 0 ? ( 
                        <div className="flex flex-col items-center justify-center">
                            <RiMessage3Line className="text-5xl md:text-8xl font-bold" />
                            <h1 className="text-xl font-bold">Enter chat..</h1>
                        </div> 
                    )
                :
                    ( conversation.map((msg, index) => (
                            <div className="w-full md:w-[80%] mx-auto h-full p-5" key={index}>
                                <div className="w-full h-fit flex items-center justify-end my-4">
                                    <pre className="text-lg md:text-xl">{msg.sender === 'user' ? 'You' : 'AI'}</pre>
                                </div>
                                <div className="w-full h-fit flex items-start justify-start my-5">
                                    <img src={gem_img} alt="Gemini Logo" className="w-10" />
                                    {
                                        msg.message === "" ? <p className="text-lg m-2">Generating......</p> : <div className="text-lg m-2" dangerouslySetInnerHTML={{ __html: msg.message }}>
                                    </div>
                                    }
                                </div>
                            </div>
                        ))
                    )
                }
            </section>

            {/** AI chat btn */}
            <div className="w-full p-2">
                <div className="w-[80%] p-2 mx-auto flex items-center justify-between border-[2px] border-greenMain rounded-full overflow-hidden">
                    <input type="text" id="chat_box" placeholder="Ask Me Anything.." value={inputText}
                    onChange={(e) => setInputText(e.target.value)} className="w-full p-3 text-lg outline-none rounded-full bg-transparent" />
                    <button className="flex items-center justify-center text-2xl font-bold bg-greenMain text-whiteMain h-full p-5 rounded-full" onClick={handleSendText}><IoSend /></button>
                </div>
            </div>
        </section>
     );
}

export default Chat;