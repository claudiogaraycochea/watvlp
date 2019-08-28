import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import { request, ContentTypes } from '../../../../../lib/http';

class FileUploadModal extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			file: null,
		};
		this.handleUpload = this.handleUpload.bind(this);
	}

	async handleUpload() {
		const { file } = this.state;
		const formdata = new FormData();
		const blob = file.slice(0, file.size, 'image/jpg');
		const userImage = new File([blob], 'avatar.jpg', { type: 'image/jpg' });
		formdata.append('files', userImage);

		try {
			const resp = await request('POST', this.props.endpoint, formdata, { 'content-type': ContentTypes.formData });
			this.props.handleModalAccept();
			console.log(resp);
		} catch (err) {
			console.error(err);
		}
	}

	render() {
		const { handleModalClose } = this.props;

		return (
			<div>
				<div className='modal-header'>
					{'Upload Image'}
				</div>
				<div className='modal-container'>
					<input type='file' name='file' onChange={(event) => this.setState({ file: event.target.files[0] })} />
				</div>
				<div className='modal-bottom'>
					<Button variant='primary' onClick={handleModalClose}>Cancel</Button>
					<Button variant='secondary' onClick={() => this.handleUpload()}>Accept</Button>
				</div>
			</div>
		);
	}
}

FileUploadModal.propTypes = {
	handleModalClose: PropTypes.func.isRequired,
	handleModalAccept: PropTypes.func.isRequired,
	endpoint: PropTypes.string.isRequired,
};

export default FileUploadModal;
