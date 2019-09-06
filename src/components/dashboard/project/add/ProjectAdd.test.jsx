import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from '../../../../store/Store';

import AddProject from './ProjectAddContainer';

it('render correctly Add Project component', () => {
	const props = { setHeaderTitle: jest.fn() };
	const div = document.createElement('div');
	ReactDOM.render(
		<Provider store={store}>
			<Router>
				<AddProject setHeaderTitle={props.setHeaderTitle} />
			</Router>
		</Provider>, div,
	);
	ReactDOM.unmountComponentAtNode(div);
});
