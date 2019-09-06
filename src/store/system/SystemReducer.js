const initialState = {
	device: '',
	headerTitle: '',
};

export default function system(state = initialState, action) {
	switch (action.type) {
		case 'SET_DEVICE':
			return {
				...state,
				device: action.device,
			};
		case 'SET_HEADER_TITLE':
			return {
				...state,
				headerTitle: action.headerTitle,
			};
		default:
			return state;
	}
}
