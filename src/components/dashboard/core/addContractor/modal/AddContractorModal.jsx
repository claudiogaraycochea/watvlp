import React, { Component } from 'react';
import {
	Row, Col, Form, Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

import './AddContractorModal.css';

class AddContractorModal extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			query: '',
			selectedAsignee: [],
		};
		this.handleInputQueryChange = this.handleInputQueryChange.bind(this);
		this.handleAddToselectedAsignee = this.handleAddToselectedAsignee.bind(this);
		this.handleRemoveFromselectedAsignee = this.handleRemoveFromselectedAsignee.bind(this);
		this.onKeyUp = this.onKeyUp.bind(this);
	}

	componentWillMount() {
		const { task } = this.props;
		const selectedAsignee = task.assignee.map((contractor) => {
			const assigneeItem = {
				uid: contractor.uid,
				fullname: contractor.fullname,
			};
			return assigneeItem;
		});
		this.setState({ selectedAsignee });
	}

	componentDidUpdate(prevProps) {
		if (prevProps.assignee !== this.props.assignee) {
			this.props.handleModalAccept();
		}
	}

	onKeyUp(event, contractor) {
		if (event.keyCode === 13) {
			this.handleAddToselectedAsignee(contractor);
		}
	}

	getAssignee() {
		const { selectedAsignee } = this.state;
		const assigneeString = selectedAsignee.map((contractor) => {
			return (
				<div key={contractor.uid} className='assignee-item'>
					{contractor.fullname}
					<Button
						className='btn-link'
						onClick={
							() => this.handleRemoveFromselectedAsignee(contractor.uid)
						}
					>
						<i className='icon-remove-sec' />
					</Button>
				</div>
			);
		});
		return assigneeString;
	}

	renderContractor = (contractor) => {
		const { fullname, role } = contractor;
		return (
			<Row className='min-bottom div-line' key={contractor.id}>
				<Col>
					<div className='user-project'>
						<div className='image'>
							<i className='icon-user-sec' />
						</div>
						<div className='description'>
							<div className='fullname'>{fullname}</div>
							<div className='subtitle'>{role}</div>
						</div>
						<div className='menu'>
							<button type='button' className='btn'>
								<i
									className='icon-add-sec'
									onClick={() => this.handleAddToselectedAsignee(contractor)}
									role='button'
									tabIndex={0}
									onKeyUp={(event) => this.onKeyUp(event, contractor)}
								/>
							</button>
						</div>
					</div>
				</Col>
			</Row>
		);
	};

	handleAddToselectedAsignee = (contractor) => {
		const { selectedAsignee } = this.state;
		const existselectedAsignee = !!(selectedAsignee.find((assignee) => {
			return assignee.uid === contractor.uid;
		}));

		if (!existselectedAsignee) {
			const assigneeItem = {
				uid: contractor.uid,
				fullname: contractor.fullname,
			};

			selectedAsignee.push(assigneeItem);

			this.setState({
				selectedAsignee,
			});
		}
	}

	handleRemoveFromselectedAsignee(uid) {
		const { selectedAsignee } = this.state;
		const newAssignee = [];

		const newselectedAsignee = Object.keys(selectedAsignee).reduce((object, key) => {
			if (selectedAsignee[key].uid !== uid) {
				newAssignee.push(selectedAsignee[key]);
			}
			return newAssignee;
		}, {});

		this.setState({
			selectedAsignee: newselectedAsignee,
		});
	}

	addContractor() {
		const { project_id } = this.props;
		const { task_id } = this.props.task;
		const { selectedAsignee } = this.state;
		const assigneeArray = [];
		const assignee = Object.keys(selectedAsignee).reduce((object, key) => {
			assigneeArray.push(selectedAsignee[key].uid);
			return assigneeArray;
		}, {});
		const assigneeObject = {
			assignee,
		};
		this.props.addContractor(project_id, task_id, assigneeObject);
	}

	handleInputQueryChange(event) {
		const query = event.target.value;
		this.props.searchContractor(query);
		this.setState({
			query,
		});
	}

	render() {
		const { handleModalClose, contractorList } = this.props;
		const { query } = this.state;

		return (
			<div>
				<div className='modal-header'>
					{'Add contractor'}
				</div>
				<div className='modal-container'>
					<Form.Group>
						<Form.Control
							type='text'
							placeholder='Search Contractor'
							name='query'
							value={query}
							onChange={this.handleInputQueryChange}
						/>
					</Form.Group>
					<Row>
						<Col>
							<div className='contractor-list'>
								{ contractorList.map((contractor) => this.renderContractor(contractor)) }
							</div>
						</Col>
					</Row>
					<Row className='div-line'>
						<Col>
							<div>Selected</div>
							<div className='assignee-selected-wrapper'>
								{this.getAssignee()}
							</div>
						</Col>
					</Row>
				</div>
				<div className='modal-bottom'>
					<Button variant='primary' onClick={handleModalClose}>Cancel</Button>
					<Button variant='secondary' onClick={() => this.addContractor()}>Accept</Button>
				</div>
			</div>
		);
	}
}

AddContractorModal.propTypes = {
	task: PropTypes.object,
	assignee: PropTypes.object,
	handleModalAccept: PropTypes.func.isRequired,
	handleModalClose: PropTypes.func.isRequired,
	addContractor: PropTypes.func.isRequired,
	contractorList: PropTypes.array.isRequired,
	project_id: PropTypes.string.isRequired,
	searchContractor: PropTypes.func.isRequired,
};

AddContractorModal.defaultProps = {
	contractorList: [],
	task: {},
	assignee: {},
	project_id: null,
};

export default AddContractorModal;
