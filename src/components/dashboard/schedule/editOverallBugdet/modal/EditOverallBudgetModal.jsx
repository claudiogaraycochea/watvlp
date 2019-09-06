import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

class EditOverallBudgetModal extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			excpected_funding: 0,
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentWillMount() {
		const { excpectedFunding } = this.props.project;
		this.setState({ excpected_funding: excpectedFunding });
	}

	componentDidUpdate(prevProps) {
		if (prevProps.excpectedFunding !== this.props.excpectedFunding) {
			this.props.handleModalAccept();
		}
	}

	handleInputChange(event) {
		const { target } = event;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const { name } = target;

		this.setState({ [name]: value });
	}

	updateOverallBudget() {
		const { excpected_funding } = this.state;
		const { project_id } = this.props.project;
		const projectData = {
			updates: {
				excpectedFunding: excpected_funding,
			},
			updatedBy: project_id,
		};
		this.props.updateOverallBudget(project_id, projectData);
	}

	render() {
		const { handleModalClose } = this.props;
		const { excpected_funding } = this.state;
		return (
			<div>
				<div className='modal-header'>
					{'Edit Overall Budget'}
				</div>
				<div className='modal-container'>
					<Form.Group>
						<Form.Label>Budget for Project Name</Form.Label>
						<Form.Control
							type='number'
							placeholder='0'
							name='excpected_funding'
							value={excpected_funding}
							onChange={this.handleInputChange}
						/>
					</Form.Group>
				</div>
				<div className='modal-bottom'>
					<Button variant='primary' onClick={handleModalClose}>Cancel</Button>
					<Button variant='secondary' onClick={() => this.updateOverallBudget()}>Accept</Button>
				</div>
			</div>
		);
	}
}

EditOverallBudgetModal.propTypes = {
	handleModalClose: PropTypes.func.isRequired,
	handleModalAccept: PropTypes.func.isRequired,
	project: PropTypes.object,
	excpectedFunding: PropTypes.any,
	updateOverallBudget: PropTypes.func.isRequired,
};

EditOverallBudgetModal.defaultProps = {
	handleModalClose: () => null,
	handleModalAccept: () => null,
	project: {},
	excpectedFunding: 0,
};

export default EditOverallBudgetModal;
