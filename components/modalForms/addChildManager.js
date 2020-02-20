import React, { Component } from 'react';
import { Modal, Input, Form, Button, Message } from 'semantic-ui-react';
import Fund from '../../ethereum/fund';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';
import axios from 'axios'
class ModalForm extends Component {
	state = {
		loading: false,
		errorMessage: '',
		childManagerAddress: '',
		showModal: false,
		success: false
	}

	closeModal = () => {
		this.setState({ showModal: false });
	}

	onSubmit = async event => {
		event.preventDefault();

		const { address } = this.props;
		var authorized=false
		this.setState({ loading: true, errorMessage: '' });

		try {

			const fund = Fund(address);

			const accounts = await web3.eth.getAccounts();
			await axios.get('http://127.0.0.1:9999/users/'+this.state.childManagerAddress)
			authorized=true
			await fund.methods.addPotentialChildManager(this.state.childManagerAddress).send({ 
				from: accounts[0]
			});

			// Router.pushRoute(`/funds/${address}`);

			this.setState({ childManagerAddress: '', success: true });

			// this.closeModal();
			Router.replaceRoute(`/funds/${address}`);

		} catch(err) {
			console.log(err)
			if(!authorized)
			this.setState({errorMessage:'Potential manager must be registered first'})
			else
			this.setState({ errorMessage: err.message });
		}
		this.setState({ loading: false });
	}

	render() {
		return (
			<Modal 
				onClose={this.closeModal}
				open={this.state.showModal}
				trigger={
					<Button  
						onClick={() => { this.setState({ showModal: true }) }}
						style={{ marginTop: 10}}
						content="Add Deputy Manager"
						icon="add circle"
						primary
					/>
				}
			>
			<Modal.Header>Add Potential Child Manager</Modal.Header>
			    <Modal.Content>
			      <Modal.Description>
				      	<Message 
			     			warning
			     			header="Pay Attention!"
			     			content="Potential Child Managers can only be added by Manager of this node/organization."
			     		/>
			      		<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
					<Form.Field>
							<label>Potential Child Manager Address</label>
							<Input 
								value={this.state.childManagerAddress}
								onChange={event => this.setState({ childManagerAddress: event.target.value, success: false })}
							/>
						</Form.Field>
						<Message error header="Oops!" content={this.state.errorMessage} />
						<Button primary loading={this.state.loading}>Add</Button>
					</Form>

					{
						this.state.success ? (
							<Message 
								success
								header="Congrats!" 
								content="Potential Child Manager has been added successfully"
							/>
						) : null
					}
			     
			      </Modal.Description>
			    </Modal.Content>
			    
			</Modal>
		);
	}
}


export default ModalForm;