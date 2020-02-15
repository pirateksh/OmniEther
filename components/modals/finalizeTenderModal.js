/*
	Incoming props - 
	address - Address of Fund
*/
import React, { Component } from 'react';
import { Modal, Input, Form, Button, Message, Checkbox, Table } from 'semantic-ui-react';
import Fund from '../../ethereum/fund';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class FloatTenderModal extends Component {

	state = {
		loading: false,
		errorMessage: '',
		showModal: false,
		success: false
	}

	closeModal = () => {
		this.setState({ showModal: false });
	}

	onSubmit = async event => {
		event.preventDefault();

		const { address } = this.props;

		this.setState({ loading: true, errorMessage: '' });

		try {

			const accounts = await web3.eth.getAccounts();
			const fund = Fund(address);
			await fund.methods.FinalizeTender().send({ 
					from: accounts[0],
				})

			this.setState({ 
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
						content="Finalize Tender"
						icon="check circle outline"
						primary
					/>
				}
			>
			<Modal.Header>Finalize Tender </Modal.Header>
			    <Modal.Content>
			     	<Modal.Description>
			     		<Message 
			      			info
			      			header="Pay Attention!"
			      			content="Only Manager of Last Level Fund OR Leaf Fund can Finalize Tender  AND manager must add Eligible Companies as well as at least one of those companies must bid."
			      		/>
			      		<h3>Are you sure you want to Finalize Tender ?</h3>
			     		<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
							<Message error header="Oops!" content={this.state.errorMessage} />
							<Button 
								primary 
								loading={this.state.loading}
								content="Finalize"
								size="huge"
								style={{ marginLeft: 320 }}
							/>
						</Form>

						{ this.state.success ? (
							<Message 
								success
								header="Congrats!" 
								content={`Tender has been finalized and ${this.props.companyAlloted} had the lowest bid.`}/>
						) : null }
			     		
			      	</Modal.Description>
			    </Modal.Content>
			    
			</Modal>
		);
	}
}

export default FloatTenderModal;