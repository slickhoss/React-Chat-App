import React, { Component } from 'react'

export default class SendMessage extends Component {
    
    constructor ()
    {
        super()
        this.state = {
            message: '',
            senderId: ''
        }
        //in order to access component state we must bind the functions to this
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({message: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        //console.log(this.state.message);//ready to broadcast message
        //because function is passed as prop we can access -> this.prop.functionName
        this.props.sendMessage(this.state.message);
        this.setState({ message: ''});//clear state after submitting
    }

    render() {
        return (
            <form 
            onSubmit = {this.handleSubmit}
            className="send-message-form">
                <input 
                disabled = {this.props.disabled}
                onChange = {this.handleChange} //when onChange is triggered, handleChange is invoked{returns updated component state}
                value = {this.state.message} //input value is then changed to updated component state
                placeholder = "Enter" 
                type="text">
                </input>
            </form>
        )
    }
}
