import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

class AddPhaseModal extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			uid: '',
			project_id: '',
			phase_name: '',
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentWillMount() {
		const uid = localStorage.getItem('id');
		const { project_id } = this.props.project;

		this.setState({
			uid,
			project_id,
		});
	}

	componentDidUpdate(prevProps) {
		if (prevProps.phase !== this.props.phase) {
			this.props.handleModalAccept();
		}
	}

	handleInputChange(event) {
		const { target } = event;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const { name } = target;

		this.setState({ [name]: value });
	}

	addPhase() {
		const {
			uid, project_id, phase_name, planned_cost,
		} = this.state;
		const today = new Date(); // TODO: remove this
		const phase = {
			author: uid,
			cost: 0,
			endDate: today,
			name: phase_name,
			planned_cost,
			planned_endDate: today,
			planned_startDate: today,
			progress: 0,
			project_id,
			status: 0,
			startDate: today,
		};
		// console.log('addPhaseModal: ', project_id, ' phase:', phase);
		this.props.addPhase(project_id, phase);
	}

	render() {
		const { handleModalClose } = this.props;
		const {
			phase_name,
			planned_cost,
		} = this.state;
		return (
			<div>
				<div className='modal-header'>
					{'Add Phase'}
				</div>
				<div className='modal-container'>
					<Form.Group>
						<Form.Label>Phase name</Form.Label>
						<Form.Control
							type='text'
							placeholder='Phase Name'
							name='phase_name'
							value={phase_name}
							onChange={this.handleInputChange}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Budget for this phase</Form.Label>
						<Form.Control
							type='text'
							placeholder='0'
							name='planned_cost'
							value={planned_cost}
							onChange={this.handleInputChange}
						/>
					</Form.Group>
				</div>
				<div className='modal-bottom'>
					<Button variant='primary' onClick={handleModalClose}>Cancel</Button>
					<Button variant='secondary' onClick={() => this.addPhase()}>Accept</Button>
				</div>
			</div>
		);
	}
}

AddPhaseModal.propTypes = {
	handleModalClose: PropTypes.func.isRequired,
	handleModalAccept: PropTypes.func.isRequired,
	project: PropTypes.object.isRequired,
	addPhase: PropTypes.func.isRequired,
	phase: PropTypes.object.isRequired,
};

AddPhaseModal.defaultProps = {
	handleModalClose: () => null,
	handleModalAccept: () => null,
	project: {},
	addPhase: () => null,
	phase: {},
};

export default AddPhaseModal;
