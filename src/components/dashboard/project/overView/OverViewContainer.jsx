import { connect } from 'react-redux';

import { setHeaderTitle } from '../../../../store/system/SystemActions';
import { getProjects } from '../../../../store/project/ProjectActions';
import { getTasks } from '../../../../store/task/TaskActions';
import getProjectList from '../../../../mocks/project.mock';
import getTaskList from '../../../../mocks/task.mock';

import OverView from './OverView';

const mapStateToProps = (state) => {
	return {
		device: state.default.system.device,
		projects: state.default.user.projects,
		projectList: state.default.project.projectList,
		taskList: state.default.task.taskList,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setHeaderTitle: (headerTitle) => {
			dispatch(setHeaderTitle(headerTitle));
		},
		getProjects: () => {
			dispatch(getProjects(getProjectList));
		},
		getTasks: () => {
			dispatch(getTasks(getTaskList));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(OverView);
