import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Contacts extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { fullname } = this.props;
		return (
			<div className='user-project py-4 px-3 div-line'>
				<div className='image'>
					<i className='icon-user-sec' />
				</div>
				<div className='description d-flex align-items-center'>
					<div className='fullname'>{fullname}</div>
				</div>
				<div>
					<i className='icon-menu-sec' />
				</div>
			</div>
		);
	}
}

Contacts.propTypes = {
	fullname: PropTypes.string.isRequired,
};

export default Contacts;
