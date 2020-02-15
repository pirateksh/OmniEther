import React from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
	return (
		<Menu style={{ marginTop: '10px' }}>
			<Link route="/">
				<a className="item">
		
						FundManager
				
				</a>
			</Link>

			<Menu.Menu position="right">
				<Link route="/">
					<a className="item">Funds</a>
				</Link>
				<Link route="/">
					<a className="item">+</a>
				</Link>
			</Menu.Menu>
		</Menu>
	);
};