import { connect } from 'react-redux';

import Header from './Header';

const mapStateToProps = (state) => {
	return {
		device: state.default.system.device,
		headerTitle: state.default.system.headerTitle,
		profile_picture: state.default.user.profile_picture,
	};
};

export default connect(mapStateToProps, null)(Header);
