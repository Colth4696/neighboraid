import React from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import ActionCable from 'actioncable';
import { API_ROOT, API_WS_ROOT } from './constants/index';
import NewChatroomForm from './NewChatroomForm';
import MessagesArea from './MessagesArea';
import Cable from './Cable';
import axios from 'axios';

// const actionCable = {};
// actionCable.cable = ActionCable.createConsumer(API_WS_ROOT);

class ChatroomList extends React.Component {
  state = {
    chatrooms: [],
    activeChatroom: this.props.chatroom
  };

  //   componentWillMount = () => {
//     const { chatroom } = this.props;
//     if (!chatroom.messages) chatroom.messages = [];
//     if (!chatroom.id) chatroom.id = 1;
//     // this.setState({activeChatroom: chatroom});
//   //   console.log('mounted', this.props);
//     axios.get(`${API_ROOT}/chatrooms/${chatroom.id}`)
//       .then(res => {
//         console.log('res', res); 
//         this.setState({activeChatroom: res.data})
//         // res
//       })
//       // .then(chatrooms => { console.log(chatrooms); this.setState({ chatrooms })});
//   };

  componentDidMount = () => {
    const { activeChatroom } = this.state;
    axios.get(`${API_ROOT}/chatrooms`)
      .then(res => {
        const chatroomList = res.data;
        const currentRoom = chatroomList.find(room => {
          return room.name === activeChatroom.name && room.request_id === activeChatroom.request_id && room.volunteer_id === activeChatroom.volunteer_id
        })
        this.setState({ activeChatroom: currentRoom })
      })
  };

  handleClick = name => {
    this.setState({ activeChatroom: name });
  };

  handleReceivedChatroom = response => {
    console.log('handleReceivedChatroom', response);
    const { chatroom } = response;
    this.setState({
      chatrooms: [...this.state.chatrooms, chatroom]
    });
  };

  handleReceivedMessage = response => {
    console.log('response message', response);
    const { message } = response;
    const { activeChatroom } = this.state;
    activeChatroom.messages = [...activeChatroom.messages, message];
    this.setState({ activeChatroom });
  };

  render = () => {
    const { chatrooms, activeChatroom } = this.state;
    // console.log('actionCable', actionCable);
    console.log('activeChatroom', activeChatroom);
    // actionCable.cable.subscriptions.create({channel: 'ChatroomsChannel'}, 
    //   {
    //     received: (data) => {
    //       console.log(data);
    //       this.handleReceivedChatroom(data)
    //     }
    //   }
    // );
    // actionCable.cable.subscriptions.create({channel: 'MessagesChannel', chatroom: activeChatroom.id}, 
    //   {
    //     received: (data) => {
    //       console.log(data);
    //       this.handleReceivedMessage(data)
    //     }
    //   }
    // )
    return (
      <div className="chatroomsList">
        <div>
          {/* {} */}
            {/* <Cable
              chatroom={this.props.chatroom}
              handleReceivedMessage={this.handleReceivedMessage}
            /> */}
        </div>
        {/* <ActionCableConsumer
          cable={actionCable.cable}
          channel='chatrooms_channel'
          onReceived={this.handleReceivedChatroom}
        >
          <Cable
            chatroom={this.props.chatroom}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        </ActionCableConsumer> */}
        {/* ) : null} */}
        {/* <h2>Chatrooms</h2> */}
        {/* <ul>{mapChatrooms(chatrooms, this.handleClick)}</ul> */}
        {/* <NewChatroomForm /> */}
        {activeChatroom ? (
           <ActionCableConsumer
            key={activeChatroom.id}
            // cable={actionCable.cable}
            channel={{ channel: 'MessagesChannel', chatroom: activeChatroom.id }}
            onReceived={(res) => {console.log(res); this.handleReceivedMessage(res)}}
            // onInitialized= {(res) => console.log(res)}
            // onConnected= {(res) => console.log(res)}
            // onDisconnected= {(res) => console.log('disconnecting...',res)}
            // onRejected= {(res) => console.log(res)}
          />
        ) : null}
        {activeChatroom ? (
          <MessagesArea
            chatroom={activeChatroom}
            user_id={this.props.user_id}
            // findActiveChatroom(
            //   chatrooms,
            //   activeChatroom
            // )
          />
        ) : null}
      </div>
    );
  };
}

export default ChatroomList;

// helpers

// const findActiveChatroom = (chatrooms, activeChatroom) => {
//   return chatrooms.find(
//     chatroom => {
//       console.log(chatroom);
//       console.log(activeChatroom);
//       return chatroom.name === activeChatroom
//     }
//   );
// };

const mapChatrooms = (chatrooms, handleClick) => {
  return chatrooms.map(chatroom => {
    return (
      <li key={chatroom.name} onClick={() => handleClick(chatroom.name)}>
        {chatroom.name}
      </li>
    );
  });
};









// import React from 'react';
// import { ActionCable } from 'react-actioncable-provider';
// import { API_ROOT } from './constants/index';
// import NewChatroomForm from './NewChatroomForm';
// import MessagesArea from './MessagesArea';
// import Cable from './Cable';
// import axios from 'axios';

// class ChatroomsList extends React.Component {
//   state = {
//     // chatrooms: [],
//     activeChatroom: {}//this.props.chatroom
//   };

//   componentWillMount = () => {
//     const { chatroom } = this.props;
//     if (!chatroom.messages) chatroom.messages = [];
//     if (!chatroom.id) chatroom.id = 1;
//     // this.setState({activeChatroom: chatroom});
//   //   console.log('mounted', this.props);
//     axios.get(`${API_ROOT}/chatrooms/${chatroom.id}`)
//       .then(res => {
//         console.log('res', res); 
//         this.setState({activeChatroom: res.data})
//         // res
//       })
//       // .then(chatrooms => { console.log(chatrooms); this.setState({ chatrooms })});
//   };

//   // handleClick = id => {
//   //   this.setState({ activeChatroom: id });
//   // };

//   // handleReceivedChatroom = response => {
//   //   const { chatroom } = response;
//   //   this.setState({
//   //     chatrooms: [...this.state.chatrooms, chatroom]
//   //   });
//   // };

//   handleReceivedMessage = response => {
//     const { message } = response;
//     const {activeChatroom} = this.state;
//     // const chatrooms = [...this.state.chatrooms];
//     // const chatroom = chatrooms.find(
//     //   chatroom => chatroom.id === message.chatroom_id
//     // );
//     if (!activeChatroom.messages) activeChatroom.messages = [];
//     // activeChatroom.messages.concat(message)
//     activeChatroom.messages = [...activeChatroom.messages, message];
//     this.setState({ activeChatroom });
//   };

//   render = () => {
//     const { activeChatroom } = this.state;
//     console.log(activeChatroom);
//     return (
//       <div className="ChatroomsList">
//         <h1>{activeChatroom.name}</h1>
//         {activeChatroom ?
//         <div>
//           <ActionCable
//             channel={{ channel: 'chatroom_channel' }}
//           />
//             <Cable
//               chatroom={activeChatroom}
//               handleReceivedMessage={this.handleReceivedMessage}
//             />
//           <h2>Chatrooms</h2>
//           <ul>{mapchatrooms(chatrooms, this.handleClick)}</ul>
//           <NewChatroomForm />
//           {activeChatroom ? (
//             <MessagesArea
//               chatroom={activeChatroom}
//               user_id={this.props.user_id}
//             />
//           ) : null}
//           </div>
//           : 'No Chats were found'}
//       </div>
//     );
//   };
// }

// export default ChatroomsList;

// // helpers

// const findActiveChatroom = (chatrooms, activeChatroom) => {
//   console.log('chatrooms', chatrooms)
//   return chatrooms.find(
//     chatroom => {console.log(chatroom.id, activeChatroom.id); return chatroom.id === 1}
//   );
// };

// const mapchatrooms = (chatrooms, handleClick) => {
//   return chatrooms.map(chatroom => {
//     return (
//       <li key={chatroom.id} onClick={() => handleClick(chatroom.id)}>
//         {chatroom.name}
//       </li>
//     );
//   });
// };