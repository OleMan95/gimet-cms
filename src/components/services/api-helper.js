export default {
	// private
	async updateUser(token, userId, user) {
		if(!userId){
			throw new Error('No query found');
		}

		const res = await fetch(`/v1/user?id=${userId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token
			},
			body: JSON.stringify(user)
		});

		const data = await res.json();

		if(!res.ok) throw new Error('Error: '+data.message);

		return {res, data};
	},

	async updateExpert(token, expertId, expert) {
		if(!expertId){
			throw new Error('No query found');
		}

		const res = await fetch(`/v1/experts?id=${expertId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token
			},
			body: JSON.stringify(expert)
		});

		const data = await res.json();

		if(!res.ok) throw new Error('Error: '+data.message);

		return {res, data};
	},

	async getAdminData(token) {
		const res = await fetch(`/v1/user`, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token
			}
		});
		const data = await res.json();

		if(!res.ok) throw new Error('Error: '+data.message);

		return {res, data};
	},

	// public
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

	async getExperts(token, srchby, str, populate) {
		let query = '';

		if(str && srchby){
			query = `?str=${str}&srchby=${srchby}`;
		}else{
			throw new Error('No query found');
		}

		const res = await fetch('/v1/experts'+query, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token
			}
		});

		const data = await res.json();

		if(!res.ok) throw new Error('Error: '+data.message);

		console.log('data: ', data);
		return {res, data};
	},

	async getUserData(id, populate) {
		if(!id){
			throw new Error('Error: invalid expert id');
		}

		const query = populate ? `?populate=${populate}` : ``;

		const res = await fetch(`/v1/user/${id}`+query, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await res.json();

		if(!res.ok) throw new Error('Error: '+data.message);

		return {res, data};
	},

	async getExpertData(id, populate) {
		if(!id){
			throw new Error('Error: invalid expert id');
		}

		const query = populate ? `/${id}?populate=${populate}` : `/${id}`;

		const res = await fetch('/v1/experts'+query, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const data = await res.json();

		if(!res.ok) throw new Error('Error: '+data.message);

		return {res, data};
	},
};