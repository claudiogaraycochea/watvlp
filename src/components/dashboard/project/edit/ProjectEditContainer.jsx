import { connect } from 'react-redux';

import { setHeaderTitle } from '../../../../store/system/SystemActions';

import { updateProject } from '../../../../store/project/ProjectActions';

import ProjectEdit from './ProjectEdit';

const mapStateToProps = (state) => {
	return {
		project: state.default.project.project,
		projects: state.default.user.projects,
		updateProjectStatus: state.default.project.updateProjectStatus,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setHeaderTitle: (headerTitle) => {
			dispatch(setHeaderTitle(headerTitle));
		},
		updateProject: (project_id, project) => {
			dispatch(updateProject(project_id, project));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEdit);
