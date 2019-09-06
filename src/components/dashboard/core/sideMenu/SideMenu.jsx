import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './SideMenu.css';

class SideMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<div className='side-menu-header position-relative'>
					<div className='logo-wrapper'>
						<i className='logo-public-bloc' />
						<div className='text'>Public Bloc</div>
					</div>
				</div>
				<div className='menu-items'>
					<Link to='/dashboard' className='text-white'>
						<div className='item'>
							<i className='icon-home-white small space' />
							{'Home'}
						</div>
					</Link>
					<div className='item'>
						<i className='icon-financial-white small space' />
						{'Financial Dashboard'}
					</div>
					<div className='item'>
						<i className='icon-bell-white small space' />
						{'Notifications'}
					</div>
					<div className='item'>
						<i className='icon-invoice-white small space' />
						{'Invoices'}
					</div>
					<div className='item'>
						<i className='icon-contractor-white small space' />
						{'Contractors'}
					</div>
					<div className='item'>
						<i className='icon-calendar-white small space' />
						{'Calendar'}
					</div>
					<div className='item'>
						<i className='icon-settings-white small space' />
						{'Settings'}
					</div>
				</div>
				<div className='sidebar_footer'>
					<span className='text-medium'>
						{`Copyright &copy; ${new Date().getFullYear()} Public Bloc`}
					</span>
				</div>
			</div>
		);
	}
}

export default SideMenu;
