import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Login from './Login';

it('render correctly login component', () => {
	const div = document.createElement('div');
	ReactDOM.render(
		<Router>
			<Login />
		</Router>, div,
	);
	ReactDOM.unmountComponentAtNode(div);
});
