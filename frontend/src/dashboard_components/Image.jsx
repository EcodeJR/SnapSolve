import Drag_Drop from '../components/Drag_Drop';
import logo from '../assets/snapsolveLogo.png';
import gem_img from '../assets/gem_icon-nobg.png';
import { useState } from "react";

const Image = () => {
    const [conversation, setConversation] = useState([]); // Array to store the conversation history

   // Function to handle sending image to backend and updating conversation
   const handleSendImage = async (imgArray) => {
    if (imgArray.length === 0) return;

    const userMessage = { message: "Image sent" };
    const botResponse = { botResponse: "" };
    
    // Add user's image message and bot's empty response
    setConversation((prevConversation) => [...prevConversation, userMessage, botResponse]);

    try {
      const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found. Please log in.');
        }

      const formData = new FormData();
      // Assuming you're sending the first image only, you can modify it to send multiple images if needed
      formData.append('image', imgArray[0]); 

      const res = await fetch('http://localhost:8080/main/image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to upload image');
    }

      const data = await res.json();
      console.log(data);
      let msg = data.botResponse;

      const formatText = () => {
        if (!msg) return ''; // Return empty string if msg is undefined or null
      
        let formattedText = msg;
        
        // Convert bolded text
        formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Convert list items (using regular expressions for markdown-like syntax)
        formattedText = formattedText.replace(/^\* (.*?)(\n|$)/gm, '<li>$1</li>');
        // Wrap <ul> around all <li> elements
        formattedText = formattedText.replace(/(<li>.*<\/li>)+/g, '<ul>$&</ul>');
        // Add <br /> tags for new lines
        formattedText = formattedText.replace(/\n/g, '<br />');
        // Detect and format code blocks, preserving indentation and escaping special characters
        formattedText = formattedText.replace(/```(.*?)```/gs, (match, code) => {
          // Convert code to HTML-safe characters
          const escapedCode = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/\n/g, '<br>')  // Preserve newlines within the code block
            .replace(/\s/g, '&nbsp;'); // Preserve spaces

          return `<pre><code>${escapedCode}</code></pre>`;
        });

      
        return formattedText;
      };
      

      // Update the bot's response message in the conversation
      setConversation((prevConversation) => {
        const updatedConversation = [...prevConversation];
        updatedConversation[updatedConversation.length - 1] = { botResponse: formatText() };
        return updatedConversation;
      });

    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { message: 'Error communicating with server' };
      setConversation((prevConversation) => [...prevConversation, errorMessage]);
    }
  };

  return ( 
    <div className='w-full h-full flex flex-col items-center justify-center'>
        <Drag_Drop handleClick={handleSendImage} />

        <section className="w-full h-fit flex flex-col items-center justify-center">
            { conversation.length === 0 ? ( 
                    <div className="flex items-center justify-center">
                        <img src={logo} alt="Snapsolves's Logo." draggable="true" className='w-[40px] md:w-[100px] lg:w-[200px]' />
                    </div>
                )
            :
                ( conversation.map((msg, index) => (
                        <div className="w-full md:w-[80%] mx-auto h-full p-5" key={index}>
                            {/* <div className="w-full h-fit flex items-center justify-end my-4">
                                <pre className="text-lg md:text-xl">{msg.sender === 'user' ? 'You' : 'AI'}</pre>
                            </div> */}
                            <div className="w-full h-fit flex items-start justify-start my-5">
                                <img src={gem_img} alt="Gemini Logo" className="w-10" />
                                {msg.message === "" ? null : <div className="p-2 rounded-md"><p className="text-base">{msg.message}</p></div>}
                                    {
                                        msg.botResponse === "" ? <p className="text-lg m-2">Generating......</p> : <div className="text-lg m-2" dangerouslySetInnerHTML={{ __html: msg.botResponse }}>
                                    </div>
                                }
                            </div>
                        </div>
                    ))
                )
            }
        </section>
    </div>
  );
};

export default Image;
