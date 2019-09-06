import { connect } from 'react-redux';

import { addTask } from '../../../../../store/project/ProjectActions';

import AddTaskModal from './AddTaskModal';

const mapStateToProps = (state) => {
	return {
		task: state.default.project.task,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addTask: (project_id, task) => {
			dispatch(addTask(project_id, task));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskModal);
