/*
	Incoming props - 
	address - Address of Fund
	companyAlloted - Company with lowest Bid
	lowestBid - lowest bid
*/
import React, { Component } from 'react';
import { Modal, Input, Form, Button, Message, Checkbox, Table } from 'semantic-ui-react';
import Fund from '../../ethereum/fund';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';
import ChildManagerRow from '../../components/requestRows/potentialChildManagerRow';

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

	render() {

		return (

			<Modal 
				onClose={this.closeModal}
				open={this.state.showModal}
				trigger={
					<Button 
						onClick={() => { this.setState({ showModal: true }) }}
						style={{ marginTop: 10}}
						content="Finalized Company"
						icon="eye"
						primary
					/>
				}
			>
			<Modal.Header>Alloted Company with lowest bid.</Modal.Header>
			    <Modal.Content>
			     	<Modal.Description>
			     		{this.props.companyAlloted} had the lowest bid of {this.props.lowestBid} <b>GovEth</b> and thus was finalized.
			      	</Modal.Description>
			    </Modal.Content>
			    
			</Modal>
		);
	}
}

export default ModalForm;