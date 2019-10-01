import React, { Suspense } from 'react';
import '../ui/Theme.css';
import Router from '../router/Router';

function App() {
	return (
		<Suspense fallback="loading">
			<div className='App'>
				<Router />
			</div>
		</Suspense>
	);
}

export default App;
