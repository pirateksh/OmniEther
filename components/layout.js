import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import Head from 'next/head';
import { Container } from 'semantic-ui-react';

export default props => {
	return (
		<Container>
			
			<div style={{ display:"flex", minHeight:"100vh", flexDirection:"column" }}>
			<Head>
				<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
			</Head>
				<Navbar />
				<div style={{ flex:1 }}>
					{props.children}
				</div>
				<Footer />
			</div>
		 </Container>
	);
};