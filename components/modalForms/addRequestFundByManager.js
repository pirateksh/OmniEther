/*
	Incoming props - 
	address - Address of Fund
*/
import React, { Component } from 'react';
import { Modal, Input, Form, Button, Message, Checkbox } from 'semantic-ui-react';
import Fund from '../../ethereum/fund';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class ModalForm extends Component {

	state = {
		loading: false,
		errorMessage: '',
		value: '',
		assignedManager: '',
		description: '',
		isLastLevel: '',
		showModal: false,
		success: false
	}

	toggleIsLastLevel = () => this.setState((prevState) => ({ isLastLevel: !prevState.isLastLevel }))

	closeModal = () => {
		this.setState({ showModal: false });
	}

	onSubmit = async event => {
		event.preventDefault();

		const { address } = this.props;

		const {
			value,
			assignedManager,
			description,
			isLastLevel
		} = this.state;

		this.setState({ loading: true, errorMessage: '' });

		try {

			const fund = Fund(address);

			const accounts = await web3.eth.getAccounts();

			// console.log("LastLevel:", isLastLevel, " Issuing:", isIssuing);

			await fund.methods.createfundRequestByManager(
				assignedManager,
				description,
				value,
				isLastLevel
				).send({ 
					from: accounts[0]
				});

			this.setState({ 
				value: '', 
				assignedManager: '',
				description: '', 
				isLastLevel: false, 
				success: true 
			});

			// this.closeModal();
			Router.replaceRoute('getFundRequestsByManager', { contractAddress: address });

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
						floated="right"  
						onClick={() => { this.setState({ showModal: true }) }}
						style={{ marginTop: 10}}
						content="Add Request"
						icon="add circle"
						primary
					/>
				}
			>
			<Modal.Header>Add Fund Request (By Manager)</Modal.Header>
			    <Modal.Content>
			     	<Modal.Description>
			     		{ this.state.success ? (
								<Message 
									success
									header="Congrats!" 
									content="Request has been added successfully"
								/>
							) : null
						}
			     		<Message 
			     			warning
			     			header="New Fund Allotment Request"
			     			content="This request can only be added by Manager of this Fund."
			     		/>
			     		<Message 
				     		warning
				     		header="Pay Attention!"
				     		content="Value you enter must be less than or equal to this Fund's balance"
				     	/>
			      		<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
							<Form.Field>
								<label>Description</label>
								<Input 
									value={this.state.description}
									onChange={event => this.setState({ description: event.target.value })}
								/>
							</Form.Field>

							<Form.Field>
								<label>Proposed Manager</label>
								<Input 
									value={this.state.assignedManager}
									onChange={event => this.setState({ assignedManager: event.target.value })}
								/>
							</Form.Field>

							<Form.Field>
								<label>Value in GovEth</label>
								<Input 
									label='GovEth'
									labelPosition='right'
									value={this.state.value}
									onChange={event => this.setState({ value: event.target.value })}
								/>
							</Form.Field>

							<Form.Field>
							    <Checkbox 
							    	onChange={this.toggleIsLastLevel}
							    	checked={this.state.isLastLevel}
							    	label='Is this last level Fund?' 
							    />
							</Form.Field>
							
							<Message error header="Oops!" content={this.state.errorMessage} />
							<Button primary loading={this.state.loading}>Create</Button>
						</Form>
			      	</Modal.Description>
			    </Modal.Content>
			    
			</Modal>
		);
	}
}

export default ModalForm;