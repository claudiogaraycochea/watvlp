import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import TaskDetail from './TaskDetail';

it('renders correctly project detail component', () => {
	const props = {
		setHeaderTitle: jest.fn(),
		getTasks: jest.fn(),
		getTaskInfo: jest.fn(),
		taskInfo: { status: '50', percentage: '50' },
		taskList: [],
	};

	const div = document.createElement('div');
	ReactDOM.render(
		<Router>
			<TaskDetail
				setHeaderTitle={props.setHeaderTitle}
				getTasks={props.getTasks}
				getTaskInfo={props.getTaskInfo}
				taskInfo={props.taskInfo}
				taskList={props.taskList}
			/>
		</Router>, div,
	);
	ReactDOM.unmountComponentAtNode(div);
});
