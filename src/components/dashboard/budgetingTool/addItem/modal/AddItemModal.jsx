import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

class AddItemModal extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			project_id: '',
			item_name: '',
			unit_cost: 0,
			item_type: 'material',
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentWillMount() {
		const { project_id } = this.props.project;
		this.setState({ project_id });
	}

	componentDidUpdate(prevProps) {
		if (prevProps.budgetItem !== this.props.budgetItem) {
			this.props.handleModalAccept();
		}
	}

	handleInputChange(event) {
		const { target } = event;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const { name } = target;

		this.setState({ [name]: value });
	}

	addItem() {
		const { project_id, item_name, unit_cost } = this.state;
		const itemData = {
			item: {
				actual_amount: 0,
				budget_variance: 0,
				budgeted_amount: 0,
				funds_allocated: 0,
				name: item_name,
				quantity: 1,
				tasks: [],
				type: 'material',
				unit_cost,
			},
		};
		this.props.addBudgetItem(project_id, itemData);
	}

	render() {
		const { handleModalClose } = this.props;
		const {
			item_name,
			unit_cost,
			item_type,
		} = this.state;
		return (
			<div>
				<div className='modal-header'>
					{'Add Item'}
				</div>
				<div className='modal-container'>
					<Form.Group>
						<Form.Label>Item Name</Form.Label>
						<Form.Control
							type='text'
							placeholder='Item Name'
							name='item_name'
							value={item_name}
							onChange={this.handleInputChange}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Price per Unit/Hour</Form.Label>
						<Form.Control
							type='text'
							placeholder='0'
							name='unit_cost'
							value={unit_cost}
							onChange={this.handleInputChange}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Category</Form.Label>
						<Form.Control as='select' name='item_type' value={item_type} onChange={this.handleInputChange}>
							<option value='material'>Material</option>
							<option value='labor'>Labor</option>
							<option value='rent'>Equipment/Rent</option>
						</Form.Control>
					</Form.Group>
				</div>
				<div className='modal-bottom'>
					<Button variant='primary' onClick={handleModalClose}>Cancel</Button>
					<Button variant='secondary' onClick={() => this.addItem()}>Accept</Button>
				</div>
			</div>
		);
	}
}

AddItemModal.propTypes = {
	handleModalClose: PropTypes.func.isRequired,
	handleModalAccept: PropTypes.func.isRequired,
	project: PropTypes.object.isRequired,
	addBudgetItem: PropTypes.func.isRequired,
	budgetItem: PropTypes.object.isRequired,
};

AddItemModal.defaultProps = {
	handleModalClose: () => null,
	handleModalAccept: () => null,
	addBudgetItem: () => null,
};

export default AddItemModal;
