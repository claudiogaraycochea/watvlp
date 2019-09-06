import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Messagebox.css';

class Messagebox extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { type } = this.props;
		return (
			(type === 'receiver') ? (
				<div className='d-flex justify-content-end pb-1 pt-3 message-container'>
					<div className='container-box right'>
						<div className='message-body'>
							<p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>
						</div>
						<div className='arrow'>
							<div className='outer' />
							<div className='inner' />
						</div>
					</div>
					<div className='image'>
						<i className='icon-user-sec' />
					</div>
				</div>
			) : (
				<div className='d-flex pb-2 pt-3 message-container'>
					<div className='image'>
						<i className='icon-user-sec' />
					</div>
					<div className='container-box'>
						<div className='message-body'>
							<p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>
						</div>
						<div className='arrow'>
							<div className='outer' />
							<div className='inner' />
						</div>
					</div>
				</div>
			)
		);
	}
}

Messagebox.propTypes = {
	type: PropTypes.string.isRequired,
};

export default Messagebox;
