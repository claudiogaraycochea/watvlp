import { connect } from 'react-redux';

import { setHeaderTitle } from '../../../../store/system/SystemActions';

import { getUser, getUserFiles, userUpdate } from '../../../../store/user/UserActions';

import Profile from './Profile';

const mapStateToProps = (state) => {
	return {
		user: state.default.user.user,
		profile_picture: state.default.user.profile_picture,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setHeaderTitle: (headerTitle) => {
			dispatch(setHeaderTitle(headerTitle));
		},
		getUser: (user_id) => {
			dispatch(getUser(user_id));
		},
		getUserFiles: (user_id) => {
			dispatch(getUserFiles(user_id));
		},
		userUpdate: (user_id, user) => {
			dispatch(userUpdate(user_id, user));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
