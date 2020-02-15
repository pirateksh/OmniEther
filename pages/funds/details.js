// Shows users detail about particular Fund
// Here we will have Campaign's address from the URL.
import Graph from "react-graph-vis";
import React, { Component } from 'react';
import Layout from '../../components/layout';
import Fund from '../../ethereum/fund';
import { Card, Grid, Button, Modal, Input, Form, Message, Segment } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import AddChildManagerModalForm from '../../components/modalForms/addChildManager';
import InjectTokenModalForm from '../../components/modalForms/injectToken';
import WithdrawTokenModalForm from '../../components/modalForms/withdrawTokens';
import PotentialChildManagersModal from '../../components/modals/potentialChildManagerList';
import { Link, Router } from '../../routes';

class FundDetails extends Component {

	
	static async getInitialProps(props) {
		const fund = Fund(props.query.contractAddress);
		const summary = await fund.methods.getSummary().call();
		let balance = await web3.eth.getBalance(props.query.contractAddress);
		return {
			address: props.query.contractAddress, // To pass address coming from URL to contributeForm Component.
			description: summary[0],
			manager: summary[1],
			parentManager: summary[2],
			parent: summary[3],
			childFunds: summary[4],
			potentialChildManagers: summary[5],
			isLastLevel: summary[6],
			currentBalance: balance
		};
	}

	// Helper method to render cards
	renderCards() {

		// Destrcuturing from this.props
		const {
			description,
			manager,
			parentManager,
			parent,
			childFunds,
			potentialChildManagers,
			isLastLevel,
			currentBalance
		} = this.props;

		const items = [
			{
				header: manager,
				meta: 'Address of manager',
				description: 'The manager manages Funds in this Campaign',
				style: { overflowWrap: 'break-word' } // Style to limit overflow of address which is very long.
			},
			{
				header: description,
				meta: 'Description of Contract',
				description: 'Description tells about purpose of this Contract'
			},
			{
				header: parentManager,
				meta: 'Address of Parent Manager',
				description: 'Parent manager is manager of Parent of this Contract',
				style: { overflowWrap: 'break-word' } // Style to limit overflow of address which is very long.
			},
			{
				header: parent,
				meta: 'Address of Parent Contract',
				description: 'Parent contract approved funds for this contract.',
				style: { overflowWrap: 'break-word' }
			},
			{
				header: childFunds.length.toString(),
				meta: 'Number of Child Contracts',
				description: "Number of Contracts to which this Contract has alloted funds."
			},
			{
				header: potentialChildManagers.length.toString(),
				meta: 'Number of Potential Child Managers',
				description: "Number of persons who can become manager of child contract."
			},
			{
				header: web3.utils.fromWei(currentBalance, 'ether'),
				meta: 'Fund Balance (ether)',
				description: 'The balance is how much money Contract has right now'
			},
			{
				header: isLastLevel.toString(),
				meta: 'Is this Last Level Contract?',
				description: "A Last Level Contract transfers funds directly to person's address after completion of some milestone."
			}
		];

		return (
			<Card.Group items={items} />
		);
	}

	render() {
		return (
			<Layout>
				<Grid>
					<Grid.Row>
						<Grid.Column width={12}>
							<Segment textAlign="center" inverted color="grey">
								<h3>Fund Details</h3>
							</Segment>
						</Grid.Column>
						<Grid.Column width={4}>
							<Segment textAlign="center" inverted color="grey">
								<h3>Actions</h3>
							</Segment>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<Grid>
					<Grid.Row>
						<Grid.Column width={12}>
							<Segment textAlign="center">
							{this.renderCards()}
							</Segment>
						</Grid.Column>
						<Grid.Column width={4}>
							<Segment textAlign="center">
								<AddChildManagerModalForm 
									address={this.props.address}
								/>
								<PotentialChildManagersModal 
									address={this.props.address}
									potentialChildManagers={this.props.potentialChildManagers}
								/>
								<InjectTokenModalForm 
									address={this.props.address}
								/>
								<Link route='getFundRequestsByChild' params={{ contractAddress: this.props.address }}>
									<a>
										<Button 
											primary
											icon='eye'
											style={{ marginTop: 10 }}
											content='View Child Requests'
										/>
									</a>
								</Link>
								<Link route='getFundRequestsByManager' params={{ contractAddress: this.props.address }}>
									<a>
										<Button 
											primary
											icon='eye'
											style={{ marginTop: 10 }}
											content='View Manager Requests'
										/>
									</a>
								</Link>
								{!this.props.isLastLevel ? (
									<Link route='getChildFunds' params={{ contractAddress: this.props.address }}>
										<a>
											<Button 
												primary
												icon='eye'
												style={{ marginTop: 10 }}
												content='View Child Funds'
											/>
										</a>
									</Link>
								) : null }



								<WithdrawTokenModalForm 
									address={this.props.address}
									balance={this.props.currentBalance}
								/>	
							
							</Segment>
						</Grid.Column>

					</Grid.Row>
				</Grid>
			</Layout>
		);
	}
}

export default FundDetails;


// <Link route='withdrawTokens' params={{ contractAddress: this.props.address }}>
// 									<a>
// 										<Button 
// 											primary
// 											icon='eye'
// 											style={{ marginTop: 5 }}
// 											content='Withdraw Tokens'
// 										/>
// 									</a>
// 								</Link>



	
	// 				
