import { connect } from 'react-redux';

import { updateTask } from '../../../../../store/task/TaskActions';

import EditTaskModal from './EditTaskModal';

const mapStateToProps = (state) => {
	return {
		updateTaskStatus: state.default.task.updateTaskStatus,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateTask: (project_id, task_id, task) => {
			dispatch(updateTask(project_id, task_id, task));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTaskModal);
