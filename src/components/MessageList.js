import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';
export default class MessageList extends Component {

    UNSAFE_componentWillUpdate() {
        const node = ReactDOM.findDOMNode(this)
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
    }

    componentDidUpdate() {
        if(this.shouldScrollToBottom)
        {
            const node = ReactDOM.findDOMNode(this)
            node.scrollTop = node.scrollHeight
        }
    }

    render() {
        if(this.props.roomId != null){
            return (
                <div className="message-list">         
                        {this.props.messages.map((message, index) => {//foreach message in messages prop origin App.js
                            return (
                                //place each message in its own component
                                //pass through props to Message component
                                <Message key={index} senderId = {message.senderId} text ={message.text}>
                                </Message>
                            )
                        })}
                </div>
            )
        }
        else{
            return (
             <div className="message-list">
                 <div className="join-room">
                    Join a room!
                 </div>
             </div>   
            )
        }
    }
}

