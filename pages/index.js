import React, { Component } from 'react';
// import { Card, Button } from 'semantic-ui-react';
import { Button, Divider, Form, Grid, Segment, Header, Icon, Search } from 'semantic-ui-react'
import factory from '../ethereum/factory';
import Layout from '../components/layout';
import { Link } from '../routes';

class FundManagerIndex extends Component {


	render() {
		return (
			<Layout>
				<Segment placeholder raised style={{ marginTop: 50 }}>
					<Grid columns={2} stackable textAlign='center'>
						<Divider vertical>Or</Divider>

						<Grid.Row verticalAlign='middle'>
							<Grid.Column>
								<Header icon>
									<Icon name='factory' />
										Factory Functionalities
				          		</Header>
								<Link route='/factory/rootFund'>
									<a><Button primary>Create</Button></a>
								</Link>
							</Grid.Column>

							<Grid.Column>
								<Header icon>
									<Icon name='ethereum' />
									Add New Fund
				          		</Header>
								<Link route='/funds'>
									<Button primary>Create</Button>
								</Link>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Segment>

			</Layout>
		);
	}
}

export default FundManagerIndex;

 // <Search placeholder='Search countries...' />