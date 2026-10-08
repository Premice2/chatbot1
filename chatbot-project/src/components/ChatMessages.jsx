import { useRef,useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
 function ChatMessages ({chatMessages}) {
  const  chatMessagesContainerRef = useRef( // useref is a hook that allows us to create a reference to a DOM element or a React component. We can use this reference to access the properties and methods of the element or component, such as its scroll position or its height. In this case, we are creating a reference to the chat messages container, which is a div element that contains all the chat messages. We can use this reference to scroll to the bottom of the container when a new message is added.
      null
    );
   useEffect(() =>{ // to scroll to the bottom of the chat messages container when a new message is added, we can use the useEffect hook to run a function after the component has rendered. We can use the scrollTop property of the chat messages container to set its scroll position to the bottom. We can also use the scrollHeight property to get the total height of the container, which includes the height of all its child elements. By setting scrollTop to scrollHeight, we can ensure that the container is scrolled to the bottom whenever a new message is added.
      if (chatMessagesContainerRef.current) //to if the html element exists, we can check if the current property of the reference is not null. The current property is a reference to the actual DOM element that the ref is attached to. If the current property is null, it means that the element has not been rendered yet or has been removed from the DOM. In this case, we want to scroll to the bottom of the container only if it exists, so we check if chatMessagesContainerRef.current is truthy before accessing its properties.
        {
          chatMessagesContainerRef.current.scrollTop = chatMessagesContainerRef.current.scrollHeight;
        }
    },[chatMessages] // [] this run once when the component is created if the array is empty, but if we put a variable inside the array, it will run every time that variable changes. in this case, we want to run the function every time the chatMessages state changes, so we put chatMessages inside the array.
  );
  return (

    <div className="chat-messages-container" ref={chatMessagesContainerRef}>
        { chatMessages.map((chatMessage) => {
          return(
            <ChatMessage
               message={chatMessage.message}
               sender={chatMessage.sender}
               key = {chatMessage.id}
            />
          );
        })}
    </div>
  );
}
export default ChatMessages;