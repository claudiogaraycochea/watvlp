import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from '../../core/header/Header';
import Footer from '../../core/footer/Footer';

class PublicLayout extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<Header />
				{this.props.children}
				<Footer />
			</div>
		);
	}
}

PublicLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default PublicLayout;
