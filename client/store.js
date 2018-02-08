import { createStore } from 'redux';

// ACTION TYPES
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';

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

// INITIAL STATE
const initialState = {
  messages: [],
  newMessageEntry: '',
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
    default:
      return prevState;
  }
};

// STORE
const store = createStore(reducer);
export default store;
