import { useRef } from "react";

const ChatForm = ({chatHistory,setChatHistory, generateBotResponse}) => {

    const inputRef = useRef();



    const handleFormSubmit = (e) => {
        e.preventDefault();
        const usermessage = inputRef.current.value.trim();
        if (!usermessage) return;
        inputRef.current.value = "";
         
        //Update chat history with user message
        setChatHistory ((history) => [...history, {role: "user", text: usermessage}]);

        //Add "Thinking..." message to chat history
        setTimeout(() => {
            setChatHistory((history) => [...history, { role: "model", text: "Thinking..."}]);

            // Call the function to integrate the bots response
        // generateBotResponse([...chatHistory, {role: "user", text: `please address this query about the company: ${usermessage}`}]);
        // }, 600);

        generateBotResponse([...chatHistory, {role: "user", text: usermessage}]);
        }, 600);
        
        
    };


  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
        <input ref={inputRef} type="text" placeholder="Message..." className="message-input" required/>
        <button className="material-symbols-rounded">arrow_upward</button>

    </form>
  )
}

export default ChatForm;