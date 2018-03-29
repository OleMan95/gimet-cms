import Users from './users/Users';
import Experts from './experts/Experts';

/**
 * array with page routes
 * @type {*[]}
 */
const routes = [
	{
		path: '/',
		component: Experts,
		exact: true
	},
	{
		path: '/users',
		component: Users
	}
];

export default routes;
