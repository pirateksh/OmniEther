/*
	Incoming props - 
	address - Address of Fund
*/
import React, { Component } from 'react';
import { Modal, Input, Form, Button, Message, Checkbox } from 'semantic-ui-react';
import Bidding from '../../ethereum/bidding';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class ModalForm extends Component {

	state = {
		loading: false,
		errorMessage: '',
		showModal: false,
		success: false,
		bid: 0
	}

	closeModal = () => {
		this.setState({ showModal: false });
	}

	onSubmit = async event => {
		event.preventDefault();

		const { address } = this.props;

		this.setState({ loading: true, errorMessage: '' });


		try {

			const bidding = Bidding(address);

			const accounts = await web3.eth.getAccounts();
	
			await bidding.methods.bid(this.state.bid)
				.send({ 
					from: accounts[0]
				});
		
			

			this.setState({ 
				bid: 0,
				success: true 
			});

			// this.closeModal();
			Router.replaceRoute('fundDetails', { contractAddress: address });

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
						content="Bid"
						icon="add circle"
						primary
					/>
				}
			>
			<Modal.Header>Bid for Tender of this contract.</Modal.Header>
			    <Modal.Content>
			     	<Modal.Description>
			     		
			     		<Message 
			     			info
			     			header="Pay Attention!"
			     			content="Only Eligible Companies added by Manager of this Leaf Contract can bid."
			     		/>

			      		<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
							<Form.Field>
								<label>Bid Amount</label>
								<Input 
									
									value={this.state.bid}
									onChange={event => this.setState({ bid: event.target.value })}
									label='GovEth'
									labelPosition='right'
								/>
							</Form.Field>
							<Message error header="Oops!" content={this.state.errorMessage} />
							<Button primary size='huge' loading={this.state.loading}>Confirm Bid</Button>
						</Form>

			     		{ this.state.success ? (
								<Message 
									success
									header="Congrats!" 
									content={`You have successfully registered your bid for Tender of ${this.props.address}.`}
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



