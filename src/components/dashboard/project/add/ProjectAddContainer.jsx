import { connect } from 'react-redux';

import { setHeaderTitle } from '../../../../store/system/SystemActions';

import { getUserProjects } from '../../../../store/user/UserActions';

import { addProject, addWorker } from '../../../../store/project/ProjectActions';

import ProjectAdd from './ProjectAdd';

const mapStateToProps = (state) => {
	return {
		project: state.default.project.project,
		projects: state.default.user.projects,
		workerAdded: state.default.project.workerAdded,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setHeaderTitle: (headerTitle) => {
			dispatch(setHeaderTitle(headerTitle));
		},
		addProject: (project) => {
			dispatch(addProject(project));
		},
		addWorker: (project_id, workersAdd) => {
			dispatch(addWorker(project_id, workersAdd));
		},
		getUserProjects: (user_id) => {
			dispatch(getUserProjects(user_id));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAdd);
