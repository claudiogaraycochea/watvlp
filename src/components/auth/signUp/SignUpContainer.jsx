import { connect } from 'react-redux';

import { setHeaderTitle } from '../../../store/system/SystemActions';

import { signUp } from '../../../store/user/UserActions';

import SignUp from './SignUp';

const mapStateToProps = (state) => {
	return {
		user: state.default.user.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setHeaderTitle: (headerTitle) => {
			dispatch(setHeaderTitle(headerTitle));
		},
		signUp: (user) => {
			dispatch(signUp(user));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
