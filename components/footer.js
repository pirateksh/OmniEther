import React, { Component } from 'react';
import { Menu, Input } from 'semantic-ui-react';
// import '../css/footer.css';
class Footer extends Component {
    render() {
        return (
            <Menu >
                <Menu.Item>
                    (c) Developed by Team EnigmaHaxx
                </Menu.Item>
                <Menu.Item position="right">
                    MNNIT Allahabad
                </Menu.Item>
            </Menu>
        );
    }
}
export default Footer;