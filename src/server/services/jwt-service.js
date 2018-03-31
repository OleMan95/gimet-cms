const jwt = require('jsonwebtoken');
// const JWT_SECRET = require('../config').jwt.secret;
const JWT_SECRET = "summary-secret";

export default {
	async genToken(data){
		return await jwt.sign(data, JWT_SECRET, {expiresIn: '1d'});
	},

	async verify(token){
		return await jwt.verify(token, JWT_SECRET);
	}
};
