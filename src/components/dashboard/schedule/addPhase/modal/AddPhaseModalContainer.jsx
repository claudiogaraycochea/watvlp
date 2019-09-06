import { connect } from 'react-redux';

import { addPhase } from '../../../../../store/project/ProjectActions';

import AddPhaseModal from './AddPhaseModal';

const mapStateToProps = (state) => {
	return {
		phase: state.default.project.phase,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addPhase: (project_id, phase) => {
			dispatch(addPhase(project_id, phase));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPhaseModal);
