import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FullLayout extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className='min-vh-100'>
				{this.props.children}
			</div>
		);
	}
}

FullLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default FullLayout;
