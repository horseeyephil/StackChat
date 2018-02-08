import { createStore } from 'redux';

// ACTION TYPES
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';

// ACTION CREATORS
export function gotMessagesFromServer(messageArr) {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages: messageArr
  };
}

// INITIAL STATE
const initialState = {
  messages: ['Hey there!']
};

// REDUCER
const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return Object.assign({}, prevState, { messages: action.messages });
    default:
      return prevState;
  }
};

// STORE
const store = createStore(reducer);
export default store;
