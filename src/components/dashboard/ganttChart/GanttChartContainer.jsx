import { connect } from 'react-redux';

import { setHeaderTitle } from '../../../store/system/SystemActions';

import GanttChart from './GanttChart';

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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GanttChart);
