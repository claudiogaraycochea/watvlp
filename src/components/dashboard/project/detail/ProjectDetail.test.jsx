import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import ProjectDetail from './ProjectDetail';

it('renders correctly project detail component', () => {
	const props = {
		setHeaderTitle: jest.fn(),
		getProjectInfo: jest.fn(),
		projectInfo: { status: '50', percentage: '50' },
		match: { params: { project_id: '1' } },
	};

	const div = document.createElement('div');
	ReactDOM.render(
		<Router>
			<ProjectDetail
				setHeaderTitle={props.setHeaderTitle}
				match={props.match}
				getProjectInfo={props.getProjectInfo}
				projectInfo={props.projectInfo}
			/>
		</Router>, div,
	);
	ReactDOM.unmountComponentAtNode(div);
});
