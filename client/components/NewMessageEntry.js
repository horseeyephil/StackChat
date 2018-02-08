import React, { Component } from 'react';
import axios from 'axios';
import store, {writeMessage, gotNewMessageFromServer} from '../store';
import socket from '../socket';

export default class NewMessageEntry extends Component {

  constructor () {
    super();
    this.state = {
      newMessageEntry: store.getState().newMessageEntry,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe( () => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  handleChange(evt) {
    evt.preventDefault();
    store.dispatch(writeMessage(evt.target.value));
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const content = this.state.newMessageEntry;
    const channelId = this.props.channelId;

    axios.post('/api/messages', { content: content, channelId: channelId })
    .then(res => res.data)
    .then(message => {
      store.dispatch(gotNewMessageFromServer(message));
      socket.emit('new-message', message);
    });
  }

  render () {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit} >
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
            onChange={this.handleChange}
          />
          <span className="input-group-btn">
            <button
              className="btn btn-default"
              type="submit">Chat!
            </button>
          </span>
        </div>
      </form>
    );
  }
}
