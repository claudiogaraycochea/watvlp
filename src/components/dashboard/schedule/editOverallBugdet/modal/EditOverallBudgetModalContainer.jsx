import { connect } from 'react-redux';

import { updateOverallBudget } from '../../../../../store/project/ProjectActions';

import EditOverallBudgetModal from './EditOverallBudgetModal';

const mapStateToProps = (state) => {
	return {
		excpectedFunding: state.default.project.excpectedFunding,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateOverallBudget: (project_id, projectData) => {
			dispatch(updateOverallBudget(project_id, projectData));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditOverallBudgetModal);
