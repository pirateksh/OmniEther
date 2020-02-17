import React, { Component } from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { Link } from '../routes';
import GetGovEth from './modalForms/getGovEthToken';

import RegisterForm from './modals/register';
class Navbar extends Component {


	render() {

		return (
		<Menu style={{ marginTop: '10px' }}>
			<Link route="/">
				<a className="item">
						<h3>OmniEther</h3>	
				</a>
			</Link>

			<Menu.Menu position="right">
				<GetGovEth />
				<RegisterForm />
			</Menu.Menu>
		</Menu>
	);

	}
}


export default Navbar;