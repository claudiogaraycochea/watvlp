import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className='signup-header'>
				<Link to='/' className=''>
					<div className='d-inline-flex align-self-center'>
						<div className='logo-public-bloc' />
						<div className='text-white pl-2 align-self-center'>Public Bloc</div>
					</div>
				</Link>
			</div>
		);
	}
}

export default Header;
