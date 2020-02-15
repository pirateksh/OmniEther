import React, {Component} from 'react';
// import { Card, Button } from 'semantic-ui-react';
import { Button, Divider, Form, Grid, Segment, Header, Icon, Search, Label } from 'semantic-ui-react';
import Layout from '../../../components/layout';
import { Link } from '../../../routes';

class RequestInformationIndex extends Component {

	render() {
		return (
			<Layout>
				<Segment textAlign='center' size='large' inverted color='grey'>
					Types of Requests in Fund.
				</Segment>
				<Segment placeholder  raised style={{ marginTop: 50 }}>
				    <Grid columns={2} stackable textAlign='center'>
				      	<Divider vertical>Or</Divider>

				      	<Grid.Row verticalAlign='middle'>
				        	<Grid.Column>
				          		<Header icon>
				            		<Icon name='registered outline' />
				            		Request 1
				          		</Header>
				          		<p>
				          			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				          		</p>
				        	</Grid.Column>

				        	<Grid.Column>
				          		<Header icon>
				            		<Icon name='registered' />
				           			Request 2
				          		</Header>
				        		<p>
				        			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				        		</p>
				        	</Grid.Column>
				      	</Grid.Row>
				    </Grid>
				</Segment>

				<Segment textAlign='center' size='large' color='grey'>
					NOTE:  Go to any Fund's Instance to get more insight about requests.
				</Segment>

			</Layout>
		);
	}
}

export default RequestInformationIndex;

 // <Search placeholder='Search countries...' />