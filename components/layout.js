import React, { Component } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import Head from 'next/head';
import { Container, Dimmer, Segment, Loader } from 'semantic-ui-react';



class Layout extends Component {

	state = {
		isLoading: false
	}

	setLoading = () => {
		this.setState({ isLoading: true })
	}
	setNotLoading = () => {
		this.setState({ isLoading: false })
	}
	
	render() {
		
		
		return (
			<Container>
				
				<div style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
					<Head>
						<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
					</Head>
					<Navbar />
					<Dimmer.Dimmable as={Segment} dimmed={this.state.isLoading}>
						<div style={{ flex: 1 }}>
						
						{this.props.render({setLoading:this.setLoading,setNotLoading:this.setNotLoading})}
						
						</div>
						<Dimmer active={this.state.isLoading}>
							<Loader>Loading</Loader>
						</Dimmer>
					</Dimmer.Dimmable>
					<Footer />
				</div>
			</Container>
		);
	}
}

export default Layout;