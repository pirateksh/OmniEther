import React, {Component} from 'react';
// import { Card, Button } from 'semantic-ui-react';
import { Button, Card, Grid, Divider, Segment, Form, Input, Message } from 'semantic-ui-react'
import factory from '../../ethereum/factory';
import Layout from '../../components/layout';
import { Link, Router } from '../../routes';
import Fund from '../../ethereum/fund';

class FactoryIndex extends Component {

	state = {
		fundAddress: '',
		errorMessage: ''
	}

	static async getInitialProps() {
		const funds = await factory.methods.getDeployedRoots().call();
		// We have to change this as  here only Root Nodes are being fetched.

		return { funds };
	}

	/*onSubmit() {
		// This is NOT working as of now. CHECK THIS
		Router.replaceRoute(`funds/${ this.state.fundAddress }`);
	}*/

	renderFunds() {
		const items = this.props.funds.map(address => {
			// For each Campaign, does the following.
			return {
				header: address,
				description: (
					<Link route='fundDetails' params={{ contractAddress: address }}>
						<a>View Fund</a>
					</Link>
				),
				fluid: true
			};
		});
		return <Card.Group items={items} />
	}

	render () {
		return (
			<Layout>

				<Grid>
					<Grid.Row>
						<Grid.Column width={12}>
							<Segment textAlign="center" inverted color="grey">
								<h3>All Funds</h3>
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
							{this.renderFunds()}
							</Segment>
						</Grid.Column>

						<Grid.Column width={4}>
							<Segment textAlign="center">
							
							</Segment>
						</Grid.Column>

					</Grid.Row>
				</Grid>

			</Layout>
		);
	}
}

export default FactoryIndex;

// <Form 
								// 	onSubmit={this.onSubmit} 
								// 	error={!!this.state.errorMessage}>
								// 	<Form.Field>
								// 		<label>Fund Address</label>
								// 		<Input 
								// 			value={this.state.fundAddress}
								// 			onChange={event => this.setState({ fundAddress: event.target.value })}
								// 		/>
								// 	</Form.Field>
								// 	<Message error header="Oops!" content={this.state.errorMessage} />
								// 	<Button primary>Show Details</Button>
								// </Form>


	// <Link route="/factory/parentFund/parentCreationRequests/new">
									// <a>
										// <Button 
										// content="Create Parent Fund"
										// icon="add circle"
										// primary
										// />
									// </a>
								// </Link>



	
							