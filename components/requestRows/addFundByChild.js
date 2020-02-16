/*
	Incoming props - 
	key={index}
	id={index}
	request={request}
	address - Address of Fund whose requests are to be displayed
*/
import React, { Component } from 'react';
import { Table, Button, Message } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import Fund from '../../ethereum/fund';
import { Router } from '../../routes';

class RequestRow extends Component {
	
	state = {
		loading: false,
		errorMessage: ''
	}

	onApprove = async () => {
		this.setState({ loading: true, errorMessage: '' });

		const accounts = await web3.eth.getAccounts();

		const fund = Fund(this.props.address);

		try {
			await fund.methods.approvefundRequestByChild(this.props.id)
				.send({
					from: accounts[0]
				});
			Router.pushRoute('getFundRequestsByChild', { contractAddress: this.props.address});
		} catch (err) {
			this.setState({ errorMessage: err.message });
		}

		this.setState({ loading: false });
	}

	onFinalize = async () => {

		this.setState({ loading: true, errorMessage: '' });

		const accounts = await web3.eth.getAccounts();

		const fund = Fund(this.props.address);


		try{

			await fund.methods.finalizefundRequestByChild(this.props.id).send({
				from: accounts[0]
			});

			Router.pushRoute('getFundRequestsByChild', { contractAddress: this.props.address});

		} catch (err) {
			this.setState({ errorMessage: err.message });
		}

		this.setState({ loading: false });
	};

	render() {

		const { Row, Cell } = Table;
		const { id, request } = this.props;

		return (
			<Row>
 				<Cell>{id}</Cell>
 				<Cell>{request.requestCreator}</Cell>
 				<Cell>{request.description}</Cell>
 				<Cell>{request.value}</Cell>
 				<Cell>{request.isLastLevel.toString()}</Cell>

 				<Cell>
 					{this.state.errorMessage ? (
 						<Message error header="Oops!" content={this.state.errorMessage} />
 						) : null
 					}
 					{request.approvedByCurrentManager ? (
 						<Button color="green" basic disabled>
	 						Approved
	 					</Button>
 						) : (
	 					<Button loading={this.state.loading} color="teal" basic onClick={this.onApprove}>
	 						Approve
	 					</Button>
 					)}
 				</Cell>

 				<Cell>
 					{this.state.errorMessage ? (
 						<Message error header="Oops!" content={this.state.errorMessage} />
 						) : null
 					}
 					{request.approvedByParentManager ? (
 						<Button color="green" basic disabled>
	 						Approved
	 					</Button>
 						) : (
	 					<Button loading={this.state.loading} color="teal" basic onClick={this.onApprove}>
	 						Approve
	 					</Button>
 					)}
 				</Cell>

 				<Cell>
 					{this.state.errorMessage ? (
 						<Message error header="Oops!" content={this.state.errorMessage} />
 						) : null
 					}
 					{request.complete ? (
 						<Button color="green" basic disabled>
	 						Finalized
	 					</Button>
 						) : (
	 					<Button loading={this.state.loading} color="teal" basic onClick={this.onFinalize}>
	 						Finalize
	 					</Button>
 					)}
 				</Cell>
 		
			</Row>
		);
	}
}

export default RequestRow;