import React, { Component } from 'react';
import { Modal, Input, Form, Button, Message } from 'semantic-ui-react';
import Fund from '../../ethereum/fund';
import ICO from '../../ethereum/ico';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class ModalForm extends Component {
	state = {
		loading: false,
		errorMessage: '',
		amountInWei: '',
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

			await ICO.methods.get_GovEth_tokens().send({ 
				from: accounts[0],
				value: this.state.amountInWei
			});

			// Router.pushRoute(`/funds/${address}`);

			this.setState({ amountInWei: '', success: true });

			// this.closeModal();
			// Router.replaceRoute('/');

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
					<Button  basic
						onClick={() => { this.setState({ showModal: true }) }}
						
						content="GovEth Tokens"
						icon="add circle"
						
					/>
				}
			>
			<Modal.Header>Get GovEth Tokens</Modal.Header>
			    <Modal.Content>
			      <Modal.Description>
			
			      		<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
					<Form.Field>
							<label>Amount</label>
							<Input 
								value={this.state.amountInWei}
								onChange={event => this.setState({ amountInWei: event.target.value, success: false })}
							/>
						</Form.Field>
						<Message error header="Oops!" content={this.state.errorMessage} />
						<Button primary loading={this.state.loading}>Transact</Button>
					</Form>

					{
						this.state.success ? (
							<Message 
								success
								header="Congrats!" 
								content="You have successfully got specified tokens."
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