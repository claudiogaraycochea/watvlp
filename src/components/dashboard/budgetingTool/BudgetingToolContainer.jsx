import { connect } from 'react-redux';

import { setHeaderTitle } from '../../../store/system/SystemActions';
import { getProjectBudget } from '../../../store/project/ProjectActions';
import { getUserProjects } from '../../../store/user/UserActions';

import BudgetingTool from './BudgetingTool';

const mapStateToProps = (state) => {
	return {
		projects: state.default.user.projects,
		projectBudget: state.default.project.projectBudget,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setHeaderTitle: (headerTitle) => {
			dispatch(setHeaderTitle(headerTitle));
		},
		getProjectBudget: (project_id) => {
			dispatch(getProjectBudget(project_id));
		},
		getUserProjects: (user_id) => {
			dispatch(getUserProjects(user_id));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetingTool);
