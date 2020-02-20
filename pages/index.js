import React, { Component } from 'react';
// import { Card, Button } from 'semantic-ui-react';
import { Button, Divider, Form, Grid, Segment, Header, Icon, Search, Menu } from 'semantic-ui-react'
import factory from '../ethereum/factory';
import Layout from '../components/layout';
import { Link, Router } from '../routes';
import Fund from '../ethereum/fund'
import Graph from "react-graph-vis";

class FundManagerIndex extends Component {
	state={
        
		loadingButton: false,
		loadingButton1: false
	};

	
	
	
	



	onClick = () => {
		this.setState({ loadingButton: true })
		Router.pushRoute('/factory/rootFund');
	}
	onClick1 = () => {
		this.setState({ loadingButton1: true })
		// Router.pushRoute('/graph-vis/graph');
	}

	

	render() {
		
		return (
			
			<Layout
			render={({setLoading,setNotLoading}) => (
				<Segment placeholder raised style={{ marginTop: 50 }}>
					<Grid columns={2} stackable textAlign='center'>
						<Divider vertical> => </Divider>

						<Grid.Row verticalAlign='middle'>
							<Grid.Column>
								<Header icon>
									<Icon name='factory' />
										Factory Functionalities
				          		</Header>
								<Link route='/factory/rootFund'>
									<a>
										<Button 
											primary
											content='Enter'
											loading={this.state.loadingButton}
											onClick={this.onClick}
										/>
									</a>
								</Link>
							</Grid.Column>

							<Grid.Column>
							<Header icon>
									<Icon name='code branch' />
										Show current status of funds
				          		</Header>
								 <Link route='/graph-vis/graph'>
									<a> 
										<Button 
											primary
											content='Show'
											loading={this.state.loadingButton1}
											onClick={this.onClick1}
										/>
									</a>
								</Link> 
								{/* <div>{!this.state.loading?this.renderGraph(setLoading):''}</div>
								<br />
								<div>{this.state.flag?this.state.node:''}</div>
								<div>{this.state.flag1?this.state.nodes:''}</div> */}
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Segment>
			)}
			/>
			
		);


	}
}
export default FundManagerIndex;
	