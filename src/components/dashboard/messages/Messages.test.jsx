import React from 'react';
import ReactDOM from 'react-dom';

import Message from './Messages';


it('render correctly messages component component', () => {
	const props = { setHeaderTitle: jest.fn() };
	const div = document.createElement('div');
	ReactDOM.render(<Message setHeaderTitle={props.setHeaderTitle} />, div);
	ReactDOM.unmountComponentAtNode(div);
});
