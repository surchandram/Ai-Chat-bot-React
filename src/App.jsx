import { useState } from 'react';
import Chatboticon from "./components/Chatboticon"
import ChatForm from "./components/ChatForm"
import ChatMessage from "./components/ChatMessage"

const App = () => {

  const [chatHistory, setChatHistory] = useState([]);

  const generateBotResponse = async(history) => {

    //helper function Update chat history with "Thinking..." message
    const updateHistory = (text) => {
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), {role: "model", text}]);
    }



    //Format chat history for api request
    history = history.map(({role, text}) => ({role, parts: [{text}]}));

    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents:history })

    };

    try{
      //make the api call to get the bot response
      const response = await fetch(import.meta.env.VITE_API_URL, requestOption);
      const data = await response.json();
      if(!response.ok)
        throw new Error(data.message || "Something went wrong");
        //console.log(data);


        //clean and update the chat history with the bot response
        const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
        //console.log(apiResponseText);
        updateHistory(apiResponseText);
      

    }
    catch (error){
      console.log(error);
    }

  }



  return (
    <div className="container">
      <div className="chatbot-popup">
        {/* Chatbot header */}
        <div className="chat-header">
          <div className="header-info">
            <Chatboticon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button className="material-symbols-rounded">keyboard_arrow_down</button>
        </div>

        {/* Chatbot body */}

        <div className="chat-body">
          <div className="message bot-message">
          <Chatboticon />
          <p className="message-text">
            Hello! I am Chatbot. How can I help you today?
          </p>
          </div>

         {/* render the chat dynamically*/}

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat}/> 
          ))}
        </div>



        {/* Chatbot footer .. render the chat dynamically*/}
        <div className="chat-footer">
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory}  generateBotResponse={generateBotResponse}/>
        </div>


      </div>
    </div>
  )
}

export default App