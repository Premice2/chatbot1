 import { useState} from 'react';
 import {Chatbot} from 'supersimpledev';
 export    function ChatInput({chatMessages, setChatMessages}) { // to create a React component, we can define a function that returns JSX. The function name should start with a capital letter to indicate that it is a React component. The function can take props as an argument, which is an object that contains the properties passed to the component. In this case, we are not using any props, so we can leave the argument empty. a component is a reusable piece of UI that can be rendered multiple times with different data. In this case, we are creating a ChatInput component that renders an input field and a button. The input field allows the user to type a message, and the button allows the user to send the message. We can use the onChange event to capture the user's input and update the component's state accordingly. We can also use the onClick event to handle the button click and send the message to the server or perform any other action.
      
      const [inputText, setInputText] = useState('')

        function saveInputText (event) {
          setInputText(event.target.value) //to get the text inside the input element
        }

        function sendMessage () {
          const newChatMessages = [
            ...chatMessages, // this is how to copy something (...and the name of the array we want to copy in our case is chatMessages)
            // this below is the array that we want to add after coping the first one
            {
             message: inputText,
             sender: 'user',
             id: crypto.randomUUID() //to create a new unique id
            }
          ]
          setChatMessages(newChatMessages) // to update the chatMessages state with the new array that contains the user's message;

          const response = Chatbot.getResponse(inputText); //to get the response from the chatbot based on the input text
            
          setChatMessages([
            ...newChatMessages, // this is how to copy something (...and the name of the array we want to copy in our case is chatMessages)
            // this below is the array that we want to add after coping the first one
            {
             message: response,
             sender: 'robot',
             id: crypto.randomUUID() //to create a new unique id
            }
          ]);
          

          setInputText('') // to clear the input field after sending the message
        }
      return (
          
          <div className="chat-input-container">
            <input 
              className="chat-input"
              type="text" 
              placeholder="Send a message to ChatBox" 
              size="30" 
              onChange={saveInputText}
              value={inputText} // to make the input field a controlled component, we can set the value prop of the input element to the inputText state variable. This way, the input field will always reflect the current value of the inputText state, and any changes made by the user will be captured by the onChange event handler and update the state accordingly.
            /> 
            <button
             onClick={sendMessage}
             className="send-button" //in react, we can use the className attribute instead of the class attribute to specify the CSS class of an element. This is because class is a reserved keyword in JavaScript, and using it as an attribute name can cause conflicts. Therefore, we use className to avoid any issues and ensure that our code works correctly.
            >Send</button>
          </div>

        )
      }