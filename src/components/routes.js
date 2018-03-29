import Users from './users/Users';
import Experts from './experts/Experts';
import Login from './login/Login';
import NotFound from './NotFound';

/**
 * array with page routes
 * @type {*[]}
 */
const routes = [
	{
		path: '/',
		component: Login,
		exact: true
	},
	{
		path: '/experts',
		component: Experts,
		exact: true
	},
	{
		path: '/users',
		component: Users
	},
	{
		path: '*',
		component: NotFound
	}
];

export default routes;
