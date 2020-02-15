/*
	Incoming props :-
	address - Address of this Fund
	balance - Balance of this Fund
*/
import React, { Component } from 'react';
import { Modal, Input, Form, Button, Message } from 'semantic-ui-react';
import Fund from '../../ethereum/fund';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class ModalForm extends Component {
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
		console.log("CLICKED");
		const { address } = this.props;
		console.log(address);

		this.setState({ loading: true, errorMessage: '' });

		try {

			const fund = Fund(address);

			const accounts = await web3.eth.getAccounts();

			console.log(accounts[0]);

			await fund.methods.withdrawFunds().send({ 
				from: accounts[0]
			});

			// Router.pushRoute(`/funds/${address}`);

			this.setState({ success: true });

			// this.closeModal();
			Router.replaceRoute(`/funds/${address}`);

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
						content="Withdraw Tokens"
						icon="backward"
						primary
					/>
				}
			>
			<Modal.Header>Withdraw Tokens</Modal.Header>
			    <Modal.Content>
			      <Modal.Description>
			      		<Message 
			      			info
			      			header="Current Balance"
			      			content={`This fund currently contains ${web3.utils.fromWei(this.props.balance, 'ether')} ether.`}
			      		/>

			      		<Message 
			      			warning
			      			header="Pay Attention!"
			      			content="Only Manager of Parent of current Fund can Withdraw funds."
			      		/>

			      		<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
							<Message error header="Oops!" content={this.state.errorMessage} />
							<Button
				      			style={{ marginLeft: 275}}
						      	color='red'
						      	content='Withdraw'
						      	loading={this.state.loading}
						      	icon='backward'
						      	size='huge'
						      	label={{ basic: true, color: 'red', pointing: 'left', content: `${web3.utils.fromWei(this.props.balance, 'ether')}`  }}
						    />
						</Form>

			      	
					{
						this.state.success ? (
							<Message 
								success
								header="Congrats!" 
								content="Tokens have been withdrawn successfully."
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


