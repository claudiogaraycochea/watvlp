import { connect } from 'react-redux';

import { updateBudgetItem } from '../../../../../store/project/ProjectActions';

import ItemDetailModal from './ItemDetailModal';

const mapStateToProps = (state) => {
	return {
		budgetItem: state.default.project.budgetItem,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateBudgetItem: (project_id, item_id, itemData) => {
			dispatch(updateBudgetItem(project_id, item_id, itemData));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailModal);
