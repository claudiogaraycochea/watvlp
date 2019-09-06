import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Signup from './SignUp';

it('render correctly signup component', () => {
	const div = document.createElement('div');
	ReactDOM.render(
		<Router>
			<Signup />
		</Router>, div,
	);
	ReactDOM.unmountComponentAtNode(div);
});
