import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'
import socket from './socket';


// ACTION TYPES
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';
const GOT_NEW_AUTHOR = 'GOT_NEW_AUTHOR'

// ACTION CREATORS
export function gotMessagesFromServer(messageArr) {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages: messageArr
  };
}

export const writeMessage = (inputContent) => ({
  type: WRITE_MESSAGE,
  newMessageEntry: inputContent,
});

export const gotNewMessageFromServer = (newMesssage) => ({
  type: GOT_NEW_MESSAGE_FROM_SERVER,
  message: newMesssage,
});

export const gotNewAuthor = (newAuthor) =>({
  type: GOT_NEW_AUTHOR,
  authorName: newAuthor,
})



// INITIAL STATE
const initialState = {
  messages: [],
  newMessageEntry: '',
  authorName: '',
};

// REDUCER
const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return Object.assign({}, prevState, { messages: action.messages });
    case WRITE_MESSAGE:
      return Object.assign({}, prevState, { newMessageEntry: action.newMessageEntry });
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return Object.assign({}, prevState, { messages: prevState.messages.concat(action.message) });
    case GOT_NEW_AUTHOR:
      return Object.assign({}, prevState, {authorName: action.authorName})
    default:
      return prevState;
  }
};

export const fetchMessages = () => {
  return (dispatch)=>{
    axios.get('/api/messages')
    .then(res => res.data)
    .then(messages => {
      //this.setState({ messages })
      dispatch(gotMessagesFromServer(messages));
    });
  }
}

export const postMessage = (content, channelId, name) => {
  return(dispatch)=>{
     axios.post('/api/messages', { content: content, channelId: channelId, name: name })
    .then(res => res.data)
    .then(message => {
      dispatch(gotNewMessageFromServer(message));
      socket.emit('new-message', message);
    });
  }
}




// STORE

const apply = applyMiddleware(loggerMiddleware, thunkMiddleware)

const store = createStore(reducer, apply);
export default store;
