export default {
	async singin(email, password, lc2) {
		const res = await fetch('/v1/auth/signin', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({email,password,lc2})
		});
		if(!res.ok) throw new Error('status: '+res.status);
		const data = await res.json();
		return {res, data};
	},

	async getUserData(token, id) {
		const query = id ? `?id=${id}` : '';
		const res = await fetch('/v1/user'+query, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token
			}
		});
		if(!res.ok) throw new Error('status: '+res.status);
		const data = await res.json();
		return {res, data};
	},

	async getUsers(token, srchby, str) {
		let query = '';

		if(str && srchby){
			query = `?str=${str}&srchby=${srchby}`;
		}else{
			throw new Error('No query found');
		}
		console.log('query: ', query);

		const res = await fetch('/v1/users'+query, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token
			}
		});
		if(!res.ok) throw new Error('status: '+res.status);
		const data = await res.json();
		console.log('data: ', data);
		return {res, data};
	},

	async updateUser(token, userId, user) {
		let query = '';

		if(userId){
			query = `?id=${userId}`;
		}else{
			throw new Error('No query found');
		}

		const res = await fetch('/v1/user'+query, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token
			},
			body: JSON.stringify(user)
		});
		if(!res.ok) throw new Error('status: '+res.status);
		const data = await res.json();

		console.log('data: ', data);
		return {res, data};
	},

};