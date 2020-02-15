import React, { Component } from 'react';
import { Modal, Input, Form, Button, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class ModalForm extends Component {
	state = {
		loading: false,
		errorMessage: '',
		value: '',
		description: '',
		showModal: false,
		success: false
	}

	closeModal = () => {
		this.setState({ showModal: false });
	}

	onSubmit = async event => {
		event.preventDefault();

		this.setState({ loading: true, errorMessage: '' });

		try {

			const accounts = await web3.eth.getAccounts();

			console.log("accounts=:", accounts[0]);

			await factory.methods.createRootNode(this.state.description)
				.send({
					from: accounts[0],
					value: web3.utils.toWei(this.state.value, 'ether')
				})

			this.setState({ 
				value: '', 
				description: '', 
				success: true
			});

			// this.closeModal();
			Router.replaceRoute('/factory/rootFund');

		} catch(err) {
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
						content="Create Root Fund"
						icon="add circle"
						primary
					/>
				}
			>
			<Modal.Header>Create Root Fund</Modal.Header>
			    <Modal.Content>
			      <Modal.Description>
			      		<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
							<Form.Field>
								<label>Description</label>
								<Input 
									value={this.state.description}
									onChange={event => this.setState({ description: event.target.value, success: false })}
								/>
								<label style={{ marginTop: 15 }}>Initial amount to Inject</label>
								<Input 
									label='ether'
									labelPosition="right" 
									value={this.state.value}
									onChange={event => this.setState({ value: event.target.value, success: false })}
								/>
							</Form.Field>
							<Message error header="Oops!" content={this.state.errorMessage} />
							<Button primary loading={this.state.loading}>Create</Button>
						</Form>

						{ this.state.success ? (
							<Message 
								success
								header="Congrats!" 
								content="New Root Fund is deployed." />
						) : null }
			     
			      </Modal.Description>
			    </Modal.Content>
			    
			</Modal>
		);
	}
}


export default ModalForm;