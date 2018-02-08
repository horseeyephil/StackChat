import React, { Component } from 'react';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import axios from 'axios';
import store, {gotMessagesFromServer, fetchMessages} from '../store';


export default class MessagesList extends Component {

  constructor (props) {
    super(props);
    this.state = { messages: store.getState().messages };
  }

  componentDidMount () {

    this.unsubscribe = store.subscribe( () => {
      this.setState(store.getState());
    });

    const thunk = fetchMessages()
    store.dispatch(thunk)

    // axios.get('/api/messages')
    //   .then(res => res.data)
    //   .then(messages => {
    //     //this.setState({ messages })
    //     store.dispatch(gotMessagesFromServer(messages));
    //   });
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  render () {

    const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    const messages = this.state.messages;
    const filteredMessages = messages.filter(message => message.channelId === channelId);

    return (
      <div>
        <ul className="media-list">
          { filteredMessages.map(message => <Message message={message} key={message.id} />) }
        </ul>
        <NewMessageEntry channelId={channelId} />
      </div>
    );
  }
}
