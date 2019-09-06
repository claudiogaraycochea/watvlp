import { connect } from 'react-redux';

import { changeStatus } from '../../../../../store/project/ProjectActions';

import ChangeStatusModal from './ChangeStatusModal';

const mapStateToProps = (state) => {
	return {
		status: state.default.project.status,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changeStatus: (project_id, task_id, status) => {
			dispatch(changeStatus(project_id, task_id, status));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeStatusModal);
