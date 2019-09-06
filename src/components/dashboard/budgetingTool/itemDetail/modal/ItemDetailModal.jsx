import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

class ItemDetailModal extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			item_name: '',
			unit_cost: '',
			item_type: '',
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentWillMount() {
		const { item } = this.props;
		this.setState({
			item_name: item.name,
			unit_cost: item.unit_cost,
			item_type: item.type,
		});
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

	updateItem() {
		const {
			item_name, unit_cost, item_type,
		} = this.state;
		const { item, project_id } = this.props;
		const itemData = {
			name: item_name,
			quantity: 1,
			type: item_type,
			unit_cost,
		};
		this.props.updateBudgetItem(project_id, item.item_id, itemData);
	}

	render() {
		const { handleModalClose } = this.props;
		const { item_name, unit_cost, item_type } = this.state;
		return (
			<div>
				<div className='modal-header'>
					{'Item'}
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
					<Button variant='secondary' onClick={() => this.updateItem()}>Accept</Button>
				</div>
			</div>
		);
	}
}

ItemDetailModal.propTypes = {
	handleModalClose: PropTypes.func.isRequired,
	handleModalAccept: PropTypes.func.isRequired,
	updateBudgetItem: PropTypes.func.isRequired,
	project_id: PropTypes.any.isRequired,
	item: PropTypes.object,
	budgetItem: PropTypes.any,
};

ItemDetailModal.defaultProps = {
	item: {},
	budgetItem: null,
	handleModalClose: () => null,
	handleModalAccept: () => null,
};

export default ItemDetailModal;
