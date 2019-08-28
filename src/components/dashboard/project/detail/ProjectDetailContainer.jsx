import { connect } from 'react-redux';

import { setHeaderTitle } from '../../../../store/system/SystemActions';
import { getProject } from '../../../../store/project/ProjectActions';

import ProjectDetail from './ProjectDetail';

const mapStateToProps = (state) => {
	return {
		projects: state.default.user.projects,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setHeaderTitle: (headerTitle) => {
			dispatch(setHeaderTitle(headerTitle));
		},
		getProjectInfo: (project_id) => {
			dispatch(getProject(project_id));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);
