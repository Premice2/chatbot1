import RobotImage from '../assets/robot.png';
import UserImage from '../assets/user.png';
export function ChatMessage (props) { // we can pass data to a component using props. Props are read-only and cannot be modified by the component. In this case, we are passing a message prop to the ChatMessage component, which is a string that contains the message to be displayed. We can access the props object inside the component function and use it to render the message. We can also use destructuring to extract the message prop from the props object for convenience.
        const { message } = props; // to access the message prop, we can use props.message. We can also use destructuring to extract the message prop from the props object for convenience. For example, we can write const { message } = props; instead of const message = props.message;. This way, we can use the message variable directly without having to write props.message every time. We can also use default props to provide a fallback value for the message prop in case it is not passed to the component. For example, we can write ChatMessage.defaultProps = { message: "No message" }; to set a default value for the message prop.
        const { sender } = props; // we can also pass a sender prop to the ChatMessage component, which is a string that indicates who sent the message. We can use this prop to conditionally render different styles or elements based on the sender. For example, we can render a different avatar image for the user and the robot, or we can align the messages differently based on the sender. We can also use CSS classes to style the messages based on the sender. For example, we can add a className prop to the message div and set it to "user-message" or "robot-message" based on the sender. Then we can define CSS rules for these classes to style the messages accordingly.
        // this is also a shortcut of the code below const {message} = props; const {sender} = props; or const {message, sender} = props; which is called destructuring assignment. It allows us to extract multiple properties from an object and assign them to variables in a single statement. This can make our code more concise and readable, especially when we have many props to extract.
        
        /*
        all of this code has a shortcut version below(on the line 49), which is the destructuring assignment. we can use this syntax to extract the message and sender props from the props object in a single statement. This can make our code more concise and readable, especially when we have many props to extract.
        if (sender === "robot") { 
          return (
            
            <div>
             <img src="images/robot.png" width="50" />
             {message}
            </div>

          );
        }  all the code on the line 49 and 52 are actually the shortcut of if statemnents {value1==='' && value2}. the way that this code works is that if the value1 is true, then the value2 will be rendered. if the value1 is false, then nothing will be rendered. this is a common pattern in React to conditionally render elements based on some condition. we can use this pattern to render different elements based on the sender prop, such as rendering a robot avatar for the robot messages and a user avatar for the user messages.
        */

        return (
          
          <div className={sender === 'user' ? 'chat-message-user' : 'chat-message-robot'} >
            {sender === 'robot' && (
              <img src={RobotImage} width="50" />
             )
            } 
            <div className="chat-message-text" >
              {message}
           </div>
            {sender === 'user' && (
              <img src={UserImage} width="50" />
             )
            }
          </div>

        );
      }