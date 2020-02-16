// Shows users detail about particular Fund
// Here we will have Campaign's address from the URL.

import React, { Component } from 'react';
import Layout from '../../components/layout';
import Fund from '../../ethereum/fund';
import Bidding from '../../ethereum/bidding';
import { Card, Grid, Button, Modal, Input, Form, Message, Segment } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import AddChildManagerModalForm from '../../components/modalForms/addChildManager';
import InjectTokenModalForm from '../../components/modalForms/injectToken';
import WithdrawTokenModalForm from '../../components/modalForms/withdrawTokens';
import PotentialChildManagersModal from '../../components/modals/potentialChildManagerList';
import FloatTenderModal from '../../components/modals/floatTenderModal';
import FinalizeTenderModal from '../../components/modals/finalizeTenderModal';
import AddCompanyTenderModalForm from '../../components/modalForms/addTrustedCompanyToTenderModalForm';
import BiddingModalForm from '../../components/modalForms/biddingModalForm';
import AllotedCompany from '../../components/modals/allotedCompanyModal';
import { Link, Router } from '../../routes';
import token from '../../ethereum/token';
class FundDetails extends Component {



	static async getInitialProps(props) {
		const fund = Fund(props.query.contractAddress);
		const summary = await fund.methods.getSummary().call();
		const balance = await token.methods.balanceOf(props.query.contractAddress).call();
		const tenderAddress = await fund.methods.tenderAddress().call();
		const companyAlloted = await fund.methods.CompanyAlloted().call();
		const isTenderFinalized = await fund.methods.isTenderFinalized().call();

		let canFloatTender = true;
		let canFinalizeTender = false;
		let canBid = false;
		let canAddCompanies = false;

		if(tenderAddress.toString() === '0x0000000000000000000000000000000000000000') {

		} else {
			// Tender has already been floated for this instance of Fund.

			if(companyAlloted === '0x0000000000000000000000000000000000000000') {
				// If no company has been finalized yet.
				canFinalizeTender = true;
				canAddCompanies = true;
				canBid = true;

			} else {
				// Company has been alloted
				canAddCompanies = false;
				canFinalizeTender = false;
				canBid = false;
			}
			
			canFloatTender = false;
		}

		if(!summary[6]) { // summary[6] is IsLastLevel
			canFloatTender = false;
			canFinalizeTender = false;
			canBid = false;
		}

		let lowestBid = null;

		if(isTenderFinalized) {
			bidding = Bidding(tenderAddress);
			lowestBid = await bidding.methods.lowestBid().call();
		}

		

		console.log(tenderAddress.toString());
		// console.log(companyAlloted.toString());

		// Setting canFloatTender
		return {
			address: props.query.contractAddress, // To pass address coming from URL to contributeForm Component.
			description: summary[0],
			manager: summary[1],
			parentManager: summary[2],
			parent: summary[3],
			childFunds: summary[4],
			potentialChildManagers: summary[5],
			isLastLevel: summary[6],
			currentBalance: balance,
			tenderAddress: tenderAddress,
			companyAlloted: companyAlloted,
			canFloatTender: canFloatTender,
			canFinalizeTender: canFinalizeTender,
			canBid: canBid,
			canAddCompanies: canAddCompanies,
			isTenderFinalized: isTenderFinalized,
			lowestBid: lowestBid
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
				meta: 'Number of Deputy Child Managers',
				description: "Number of persons who can become manager of child contract."
			},
			{
				header: currentBalance,
				meta: 'Fund Balance (GovEth)',
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
						<Grid.Column width={10}>
							<Segment textAlign="center" inverted color="grey">
								<h3>Fund Details</h3>
							</Segment>
						</Grid.Column>
						<Grid.Column width={6}>
							<Segment textAlign="center" inverted color="grey">
								<h3>Actions</h3>
							</Segment>
						</Grid.Column>
					</Grid.Row>
				</Grid>
	
				<Grid>
					<Grid.Row>
						<Grid.Column width={10}>
							<Segment textAlign="center">
							{this.renderCards()}
							</Segment>
						</Grid.Column>

						<Grid.Column width={6}>
							<Segment textAlign="center">

								{!this.props.isLastLevel ?
								(<AddChildManagerModalForm 
									address={this.props.address}
								/>) : null
							}

								{!this.props.isLastLevel ?
								(<PotentialChildManagersModal 
									address={this.props.address}
									potentialChildManagers={this.props.potentialChildManagers}
								/>) : null
								}

								{this.props.isTenderFinalized ? (

									<AllotedCompany
										address={this.props.address}
										lowestBid={this.props.lowestBid}
										companyAlloted={this.props.companyAlloted}
									/>

									) :
									null
								}

								{this.props.manager === this.props.parentManager ? (
								<InjectTokenModalForm 
									address={this.props.address}
								/>
								) :
								null
							}

								<Link route='getFundRequestsByChild' params={{ contractAddress: this.props.address }}>
									<a>
										<Button 
											primary
											icon='eye'
											style={{ marginTop: 10 }}
											content={!this.props.isLastLevel ?
												('View Child Requests') : (
													'Milestone Completion Requests By Company'
												)}
										/>
									</a>
								</Link>
								<Link route='getFundRequestsByManager' params={{ contractAddress: this.props.address }}>
									<a>
										<Button 
											primary
											icon='eye'
											style={{ marginTop: 10 }}
											content={!this.props.isLastLevel ?
												('View Manager Requests') :
												('Milestone Assignment by Manager')
											}
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

								{this.props.canFloatTender ? (
									<FloatTenderModal 
										address= {this.props.address}
									/>
								) : null }

								{this.props.canFinalizeTender ? (
									<FinalizeTenderModal 
										address= {this.props.address}
										companyAlloted={this.props.companyAlloted}
									/>
								) : null }

								{this.props.canAddCompanies ? (
									<AddCompanyTenderModalForm 
										address={this.props.address}
									/>
								) : null}

								{this.props.canBid ? (
									<BiddingModalForm 
										address={this.props.address}
									/>
								) :
									null
								}

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




// (

// 									{!this.props.bidInstance.toString() ?
// 									( 
// 										{!this.props.companyAlloted ? 
// 											(
												

// 											) : null
// 										}
// 									)
		
// 									: null }
// 								)



// {this.props.isLastLevel ? (
// 									{!!this.props.bidInstance.toString() ? (
// 										(<Button 
// 											primary
// 											icon='eye'
// 											style={{ marginTop: 10 }}
// 											content='Finalize Bid'
// 										/>)

// 									) : }
// 								) : null}

// 								{this.props.isLastLevel ? (
// 									(
// 										{!!this.props.bidInstance.toString() ?

// 									(<Button 
// 										primary
// 										icon='eye'
// 										style={{ marginTop: 10 }}
// 										content='Bid Here'
// 									/>) : null }
// 								)
// 								) : null}