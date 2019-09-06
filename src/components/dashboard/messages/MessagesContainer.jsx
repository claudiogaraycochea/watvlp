import { connect } from 'react-redux';

import { setHeaderTitle } from '../../../store/system/SystemActions';

import Messages from './Messages';

const mapDispatchToProps = (dispatch) => {
	return {
		setHeaderTitle: (headerTitle) => {
			dispatch(setHeaderTitle(headerTitle));
		},
	};
};

export default connect(null, mapDispatchToProps)(Messages);
