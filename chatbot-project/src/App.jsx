import { useState } from 'react';
import {Chatbot} from 'supersimpledev';
import './App.css';
import RobotImage from './assets/robot.png';
import UserImage from './assets/user.png';
import { ChatInput } from './components/ChatInput';
import { ChatMessage } from './components/ChatMessage';
import ChatMessages from './components/ChatMessages';



function App() {
         const [chatMessages, setChatMessages] = useState( // this code is to convert the chatMessages (by adding React.usesate() and putting the variable inside this brakets ) into a state(data connected to the html) so that it can update the html when we click on it
          []
        ); 
        //const [chatMessages, setChatMessages] = array; // this is a shortcut of writting the code below
        //const chatMessages = array[0]; // to get the first function of our array(state) called array distructuring
        //const setChatMessages = array[1]; // this second fonction is used to update the data.
        
        // to generate html for each data saved(object) in the array. .map() takes each element in our array and convert it into a new value

        return(
          <div className="app-container"> 
            <ChatMessages
             chatMessages ={chatMessages}
            />
            <ChatInput 
              chatMessages ={chatMessages}
              setChatMessages = {setChatMessages}
            /> 
          </div>
        );
}

export default App
