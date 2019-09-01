import React from 'react';
import {
	Route, BrowserRouter, Switch, Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import { routes } from './Routes';

const isAuthenticated = () => {
	if (localStorage.getItem('id')) {
		return true;
	}
	return false;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) => (
			isAuthenticated() === true
				? <Component {...props} /> : (
					<Redirect
						to={{
							pathname: 'home/',
							state: {
								from: props.location,
							},
						}}
					/>
				)
		)}
	/>
);

const initRoutes = () => (
	<BrowserRouter>
		<Switch 
			basename={'/home'}
		>
			{routes.map((route) => (
				(route.Access === 'Private') ? (
					<PrivateRoute
						key={route.id}
						exact={route.exact}
						path={route.path}
						component={(props) => (
							<route.Layout {...props}>
								<route.Component {...props} />
							</route.Layout>
						)}
					/>
				) : (
					<Route
						key={route.id}
						exact={route.exact}
						path={route.path}
						render={(props) => (
							<route.Layout {...props}>
								<route.Component {...props} />
							</route.Layout>
						)}
					/>
				)
			))}
		</Switch>
	</BrowserRouter>
);

PrivateRoute.propTypes = {
	component: PropTypes.node.isRequired,
	location: PropTypes.object.isRequired,
};

export default initRoutes;
