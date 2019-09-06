import { connect } from 'react-redux';

import { addBudgetItem } from '../../../../../store/project/ProjectActions';

import AddItemModal from './AddItemModal';

const mapStateToProps = (state) => {
	return {
		budgetItem: state.default.project.budgetItem,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addBudgetItem: (project_id, itemData) => {
			dispatch(addBudgetItem(project_id, itemData));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItemModal);
