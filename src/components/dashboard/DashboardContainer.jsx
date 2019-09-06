import { connect } from 'react-redux';

import { setDevice } from '../../store/system/SystemActions';
import { getUserProjects, getUser } from '../../store/user/UserActions';

import Dashboard from './Dashboard';

const mapStateToProps = function mapState(state) {
	return {
		device: state.default.system.device,
		projects: state.default.user.projects,
	};
};

const mapDispatchToProps = function mapDispatch(dispatch) {
	return {
		setDevice(device) {
			dispatch(setDevice(device));
		},
		getUserProjects: (user_id) => {
			dispatch(getUserProjects(user_id));
		},
		getUserInfo: (uid) => {
			dispatch(getUser(uid));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
