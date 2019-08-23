import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Chatkit from '@pusher/chatkit-client/react-native'
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import SendMessage from './components/SendMessage';
import Message from './components/Message';
import {tokenUrl, instanceLocator} from './config';
import { join } from 'path';
import NewRoom from './components/NewRoom';

export default class App extends Component {

	constructor(){
		super()
		this.state = {
			roomId: null,
			messages: [],
			joinableRooms: [],
			joinedRooms: []
		}
		this.getRooms = this.getRooms.bind(this);
		this.subscribeToRoom = this.subscribeToRoom.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
		this.createNewRoom = this.createNewRoom.bind(this);
	}

	componentDidMount(){
    const chatManager = new Chatkit.ChatManager({
    	instanceLocator: instanceLocator,
    	userId: 'andrehoong',
    	tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
    	})
    })

    chatManager.connect()
		.then(currentUser => {
			//binds currentUser from Chatkit, to this component
			this.currentUser = currentUser; 			
			this.getRooms();

		})
	}

	//fetch joinableRooms
	getRooms(){
		this.currentUser.getJoinableRooms()
		.then(joinableRooms => {
			this.setState({
				joinableRooms: joinableRooms,
				joinedRooms: this.currentUser.rooms
			});
		})
		.catch(err => console.log('Error on joinable rooms', err));
	}

	//subscribe to default room
	subscribeToRoom(roomId) {
		this.setState({ messages: []}) //clear previous state when loading new chat room
		this.currentUser.subscribeToRoom({
			roomId: roomId,
			messageLimit: 20, 
				hooks: {
					onMessage: message => { //foreach message in chat room
						this.setState({
							messages:[...this.state.messages, message] //add to current state
						});
					}
				}
			})
			.then(room => {
				this.setState({ roomId: room.id})//save the updated roomId
				this.getRooms();//update list of rooms after changing 
			})
			.catch(err => console.log('error on subscribing to room: ', err));
	}

	createNewRoom(name) {
		this.currentUser.createRoom({
			name: name,
			private: false
		})
		.then(room => this.subscribeToRoom(room.id))
		.catch(err => console.log('Error Creating new room', err))
	}

	sendMessage(text){
		this.currentUser.sendMessage({
			text: text,
			roomId: this.state.roomId
		});
	}

	
  
	render() {
		console.log('state', this.state.messages)
    return (
    	<div className="app">
        	<RoomList roomId = {this.state.roomId} rooms = {[...this.state.joinableRooms, ...this.state.joinedRooms]} subscribeToRoom = {this.subscribeToRoom} ></RoomList>
			{/*pass messages from state to component MessageList w/ prop */}
			<MessageList roomId = {this.state.roomId} messages={this.state.messages} /> 
            {/*By passing function through prop, component SendMessage now has access to function*/}
			<SendMessage disabled = {!this.state.roomId} sendMessage = {this.sendMessage}></SendMessage>
            <NewRoom createNewRoom = {this.createNewRoom}></NewRoom>
      </div>
    );
  }
}

