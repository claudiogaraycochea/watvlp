import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<header>
				<Link to='/home'>
					<div className='logo-webandtv'></div>
				</Link>
			</header>
		);
	}
}

export default Header;
