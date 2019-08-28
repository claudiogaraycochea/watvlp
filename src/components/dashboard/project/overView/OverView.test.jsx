import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import OverView from './OverView';

it('render correctly OverView component', () => {
	const props = {
		setHeaderTitle: jest.fn(),
		projectList: [],
	};
	const div = document.createElement('div');
	ReactDOM.render(
		<Router>
			<OverView setHeaderTitle={props.setHeaderTitle}
				projects={props.projectList}
			/>
		</Router>, div,
	);
	ReactDOM.unmountComponentAtNode(div);
});
