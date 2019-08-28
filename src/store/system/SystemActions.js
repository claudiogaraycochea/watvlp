const setDevice = function setDevice(device) {
	return {
		type: 'SET_DEVICE',
		device,
	};
};

const setHeaderTitle = function setHeaderTitle(headerTitle) {
	return {
		type: 'SET_HEADER_TITLE',
		headerTitle,
	};
};

export {
	setDevice,
	setHeaderTitle,
};
