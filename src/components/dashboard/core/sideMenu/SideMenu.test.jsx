import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import SideMenu from './SideMenu';

it('render correctly sidemenu component', () => {
	const div = document.createElement('div');
	ReactDOM.render(
		<Router>
			<SideMenu />
		</Router>, div,
	);
	ReactDOM.unmountComponentAtNode(div);
});
