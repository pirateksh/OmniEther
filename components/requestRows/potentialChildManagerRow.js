/*
	Incoming props - 
	key={index}
	id={index}
	childManager={childManager}
*/
import React, { Component } from 'react';
import { Table, Button, Message } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import Fund from '../../ethereum/fund';
import { Router } from '../../routes';

class ContentRow extends Component {

	render() {

		const { Row, Cell } = Table;
		const { id, potentialChildManager,name } = this.props;

		return (
			<Row>
 				<Cell>{id}</Cell>
 				<Cell>{potentialChildManager}</Cell>
 				<Cell>{name}</Cell>
			</Row>
		);
	}
}

export default ContentRow;