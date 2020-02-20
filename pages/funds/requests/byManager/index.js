/*
	Fund Request By Manager Index
*/
import React, { Component } from 'react';
import Layout from '../../../../components/layout';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../../routes';
import web3 from '../../../../ethereum/web3';
import Fund from '../../../../ethereum/fund';
import RequestRow from '../../../../components/requestRows/addFundByManager';
import ModalForm from '../../../../components/modalForms/addRequestFundByManager';

class RequestIndex extends Component {

	static async getInitialProps(props) {

		const address = props.query.contractAddress;

		const fund = Fund(address);

		const requestCount = await fund.methods.getFundRequestByManagersCount().call();

		// Getting requests
		const requests = await Promise.all(
			Array(parseInt(requestCount)).fill().map((element, index) => {
				return fund.methods.fundIssuingsByManager(index).call();
				// fundIssuingsByManager can be assumed to be fundRequestsByManager
			})
		)

		return { address, requests, requestCount };
	}

	// Helper method to render list of requsts
	renderRows() {
		return this.props.requests.map((request, index) => {
			return <RequestRow 
				key={index}
				id={index}
				request = {request}
				address = {this.props.address}
			/>
		});
	}

	render() {

		// Destructuring from Table component to reduce length of code
		const { Header, Row, HeaderCell, Body } = Table;
		return (
			<Layout
			render={({setLoading,setNotLoading}) => (
				<div>
				<h3>New Child Node Creation Request (By Current Manager)</h3>
				<div>Found {this.props.requestCount} requests.</div>
				<ModalForm 
					address={this.props.address}
				/>
				<Table>
					<Header>
						<Row>
							<HeaderCell>ID</HeaderCell>
							<HeaderCell>Requester</HeaderCell>
							<HeaderCell>Proposed Manager</HeaderCell>
							<HeaderCell>Description</HeaderCell>
							<HeaderCell>Amount</HeaderCell>
							<HeaderCell>Last Level</HeaderCell>
							<HeaderCell>Approval <br/> (Parent Manager)</HeaderCell>
							<HeaderCell>Finalize <br/> (Current Manager)</HeaderCell>
						</Row>
					</Header>
					<Body>
						{this.renderRows()}
					</Body>
				</Table>
				</div>
			)}
			/>
		);
	}
}

export default RequestIndex;




// <Link route='newFundRequestByChild' params={{ contractAddress: this.props.address }}>
// 					<a>
// 						<Button primary floated="right" style={{ marginBottom: 10 }}>Add Request</Button>
// 					</a>
// 				</Link>