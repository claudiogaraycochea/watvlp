import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Messenger.css';

const messenger = (props) => {
	const { messageCount } = props;
	return (
		(messageCount > 0)
			? (
				<div className='position-fixed message-button'>
					<Button
						variant='primary'
						className='d-flex justify-content-center align-items-center position-relative'
					>
						<div className='icon-messages-out mx-3' />
						<div>Messenger</div>
						<div className='counter-circle'>{messageCount}</div>
					</Button>
				</div>
			)
			: null
	);
};
messenger.propTypes = {
	messageCount: PropTypes.number.isRequired,
};

export default messenger;
