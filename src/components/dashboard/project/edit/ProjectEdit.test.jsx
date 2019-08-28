import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from '../../../../store/Store';

import ProjectEdit from './ProjectEditContainer';

it('render correctly Edit Project component', () => {
	const props = {
		setHeaderTitle: jest.fn(),
		getProjectCategory: jest.fn(),
		projectCategories: [],
	};
	const div = document.createElement('div');
	ReactDOM.render(
		<Provider store={store}>
			<Router>
				<ProjectEdit
					setHeaderTitle={props.setHeaderTitle}
					getProjectCategory={props.getProjectCategory}
					projectCategories={props.projectCategories}
				/>
			</Router>
		</Provider>, div,
	);
	ReactDOM.unmountComponentAtNode(div);
});
