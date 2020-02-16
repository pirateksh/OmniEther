import React, {Component} from 'react';
// import { Card, Button } from 'semantic-ui-react';
import { Button, Card, Grid, Divider, Segment } from 'semantic-ui-react'
import factory from '../../../ethereum/factory';
import Layout from '../../../components/layout';
import { Link } from '../../../routes';
import Fund from '../../../ethereum/fund';
import CreateRootModalForm from '../../../components/modalForms/createRootNode';

class FactoryIndex extends Component {

	static async getInitialProps() {
		const funds = await factory.methods.getDeployedRoots().call();
		funds.reverse();

		var briefs = [];
		for (var i = 0; i < funds.length; i++) {
			var inst = Fund(funds[i]);
			briefs[i] = await inst.methods.briefDescription().call();	
		}

		return { funds, briefs };
	}

	renderFunds() {
		const items = this.props.funds.map((address, index) => {
			// For each Campaign, does the following.
			return {
				header: address,
				description: (
					<div>
					{this.props.briefs[index]} <br/>
					<Link route='fundDetails' params={{ contractAddress: address }}>
						<a>View Fund</a>
					</Link>
					</div>
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
								<h3>Parent Funds</h3>
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
								<CreateRootModalForm 
									rootFunds={this.props.funds}
								/>
							</Segment>
						</Grid.Column>

					</Grid.Row>
				</Grid>

			</Layout>
		);
	}
}

export default FactoryIndex;

	