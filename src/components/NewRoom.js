import React, { Component } from 'react'

export default class NewRoom extends Component {

    constructor () {
        super()
        this.state = {
            roomName: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            roomName: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createNewRoom(this.state.roomName);
        this.setState({roomName: ''});
    }
    
    render() {
        return (
            <div className="new-room-form">
                <form onSubmit = {this.handleSubmit}>
                    <input
                    value = {this.state.roomName}
                    onChange = {this.handleChange}
                    type = 'text'
                    placeholder = 'Create A Room'
                    required>
                    </input>
                    <button id = "create-room-btn">+</button>
                </form>
            </div>
        )
    }
}
