import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from '../../../../store/Store';

import Header from './Header';


it('render correctly header component', () => {
	const div = document.createElement('div');
	ReactDOM.render(
		<Provider store={store}>
			<Header />
		</Provider>, div,
	);
	ReactDOM.unmountComponentAtNode(div);
});
