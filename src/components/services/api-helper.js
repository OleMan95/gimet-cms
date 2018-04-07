export default {
	async singin(email, password, lc2) {
		const res = await fetch('/v1/auth/signin', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({email,password,lc2})
		});
		const data = await res.json();
		return {res, data};
	},

	async getUserData(token) {
		const res = await fetch('/v1/users', {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				'Authentication': token
			}
		});
		const data = await res.json();
		return {res, data};
	},

	deleteCookie(name) {

	}
};