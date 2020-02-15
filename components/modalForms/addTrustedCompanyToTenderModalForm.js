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
		companiesAddresses: '',
		numberOfCompanies: 0
	}

	closeModal = () => {
		this.setState({ showModal: false });
	}

	onSubmit = async event => {
		event.preventDefault();

		const { address } = this.props;

		this.setState({ loading: true, errorMessage: '' });

		// Splitting companies into an array
		const eligibleCompanies = this.state.companiesAddresses.split(',');

		try {

			const bidding = Bidding(address);

			const accounts = await web3.eth.getAccounts();

			eligibleCompanies.map(async (eligibleCompany, index) => {

				console.log("comp[", index, "]= ", eligibleCompany);

				await bidding.methods.addEligibleCompany(eligibleCompany)
					.send({ 
						from: accounts[0]
					});
			})
			

			this.setState({ 
				companiesAddresses: '',
				numberOfCompanies: eligibleCompanies.length,
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
						content="Add Companies"
						icon="add circle"
						primary
					/>
				}
			>
			<Modal.Header>Add Eligible Companies to Bidding contract.</Modal.Header>
			    <Modal.Content>
			     	<Modal.Description>
			     		
			     		<Message 
			     			warning
			     			header="Pay Attention!"
			     			content="Companies can only be added by Manager of Last Level Contract who has Floated Tender already."
			     		/>

			     		<Message 
			     			
			     			info
			     			header="Multiple Addresses"
			     			content="You can add multiple addresses of companies separated by a comma (,). Example: (0xf8BE6EADDE018938612dF5cF8689FD0B8AF1fe72,0xff4b8aBa33B90ad614ceeF94781B56a93Cef1156)."
			     		/>

			      		<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
							<Form.Field>
								<label>Companies' Addresses</label>
								<Input 
									value={this.state.companiesAddresses}
									onChange={event => this.setState({ companiesAddresses: event.target.value })}
								/>
							</Form.Field>
							<Message error header="Oops!" content={this.state.errorMessage} />
							<Button primary size='huge' loading={this.state.loading}>Add</Button>
						</Form>

			     		{ this.state.success ? (
								<Message 
									info
									header="Pay Attention!" 
									content={`${this.state.numberOfCompanies} companies will be added as Eligible Companies for Bidding AFTER you CONFIRM TRANSACTION FROM MetaMask.`}
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



