import { connect } from 'react-redux';

import { updateBudgetItem } from '../../../../../store/project/ProjectActions';

import AddBudgetTaskModal from './AddBudgetTaskModal';

const mapDispatchToProps = (dispatch) => {
	return {
		updateBudgetItem: (project_id, item_id, itemData) => {
			dispatch(updateBudgetItem(project_id, item_id, itemData));
		},
	};
};

export default connect(null, mapDispatchToProps)(AddBudgetTaskModal);
