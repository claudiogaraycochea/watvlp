import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from '../../store/Store';

import Dashboard from './Dashboard';

it('render correctly Dashboard component', () => {
	const props = {
		setDevice: jest.fn(),
		children: [],
		getUserProjects: jest.fn(),
		projects: [],
	};
	const div = document.createElement('div');
	ReactDOM.render(
		<Provider store={store}>
			<Router>
				<Dashboard
					setDevice={props.setDevice}
					getUserProjects={props.getUserProjects}
					projects={props.projects}
				>
					{props.children}
				</Dashboard>
			</Router>
		</Provider>, div,
	);
	ReactDOM.unmountComponentAtNode(div);
});
