import React, { Component } from 'react';
import { Form, Input, Button, Message, Segment, Card } from 'semantic-ui-react';
import Layout from '../components/layout';
const axios = require('axios').default;
const CryptoJS = require("crypto-js");

class RegistrationForm extends Component {

	state = {
		name: '',
		email: '',
		phoneNumber: '',
		uniqueID: '',
		password: '',
		ethereumAccountAddress: '',
		loading: false,
		errorMessage: ''
	}

	onSubmit = async event => {
		event.preventDefault();
		var name = this.state.name;
		var ethAddress = this.state.ethereumAccountAddress;
		var email = CryptoJS.AES.encrypt(this.state.email, this.state.password).toString();
		var phoneNumber = CryptoJS.AES.encrypt(this.state.phoneNumber, this.state.password).toString();
		var uniqueID = CryptoJS.AES.encrypt(this.state.uniqueID, this.state.password).toString();
		// console.log(name);
		// console.log(email);
		// console.log(uniqueID);
		// console.log(phoneNumber);
		// console.log(ethAddress);
		axios.post('http://127.0.0.1:9999/users/add', { name,email,uniqueID,phoneNumber,ethAddress});
		this.setState({ loading: true });
	}

	render() {

		return (
			<Layout
			render={({setLoading,setNotLoading}) => (
			<Card  size='huge'>
				<Card.Header><h4>Register</h4></Card.Header>
				<Card.Content>
				<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
					<Form.Field>
						<label>Name</label>
						<Input 
							value={this.state.name}
							onChange={event => this.setState({ name: event.target.value })}
						/>
					</Form.Field>

					<Form.Field>
						<label>Email</label>
						<Input 
							value={this.state.email}
							onChange={event => this.setState({ email: event.target.value })}
						/>
					</Form.Field>

					<Form.Field>
						<label>Phone Number</label>
						<Input 
							value={this.state.phoneNumber}
							onChange={event => this.setState({ phoneNumber: event.target.value })}
						/>
					</Form.Field>

					<Form.Field>
						<label>Unique ID</label>
						<Input 
							
							value={this.state.uniqueID}
							onChange={event => this.setState({ uniqueID: event.target.value })}
						/>
					</Form.Field>

					<Form.Field>
						<label>Password</label>
						<Input 
							type='password'
							value={this.state.password}
							onChange={event => this.setState({ password: event.target.value })}
						/>
					</Form.Field>

					<Form.Field>
						<label>Ethereum Account Address</label>
						<Input 
							
							value={this.state.ethereumAccountAddress}
							onChange={event => this.setState({ ethereumAccountAddress: event.target.value })}
						/>
					</Form.Field>

					<Message error header="Oops!" content={this.state.errorMessage} />
					<Button primary loading={this.state.loading}>Register</Button>
				</Form>
				</Card.Content>
				</Card>
			)}
			/>
		);

	}
}

export default RegistrationForm;