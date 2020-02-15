/*
	Incoming props - 
	1. address - Address of a Fund contract
*/
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

			await factory.methods.rootTokenInjection(this.props.address)
				.send({
					from: accounts[0],
					value: web3.utils.toWei(this.state.value, 'ether')
				})

			this.setState({ 
				value: '', 
				success: true
			});

			// this.closeModal();
			Router.replaceRoute('fundDetails', { contractAddress: this.props.address });

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
						content="Inject Tokens"
						icon="money"
						primary
					/>
				}
			>
			<Modal.Header>Inject Token</Modal.Header>
			    <Modal.Content>
			      <Modal.Description>
			      		<Message 
			     			warning
			     			header="Pay Attention!"
			     			content="This function is only applicaple to Root Funds. Only manager of Root Funds can Inject Money."
			     		/>
			      		<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
							<Form.Field>
								<label style={{ marginTop: 15 }}>Amount to Inject</label>
								<Input 
									label='ether'
									labelPosition="right" 
									value={this.state.value}
									onChange={event => this.setState({ value: event.target.value, success: false })}
								/>
							</Form.Field>
							<Message error header="Oops!" content={this.state.errorMessage} />
							<Button primary loading={this.state.loading}>Inject</Button>
						</Form>

						{ this.state.success ? (
							<Message 
								success
								header="Congrats!" 
								content="Fund has been successfully injected." />
						) : null }
			     
			      </Modal.Description>
			    </Modal.Content>
			    
			</Modal>
		);
	}
}


export default ModalForm;