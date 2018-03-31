const jwt = require('jsonwebtoken');
// const JWT_SECRET = require('../config').jwt.secret;
const JWT_SECRET = "summary-secret";

// genToken = async (data) => {
// 	return await jwt.sign(data, JWT_SECRET);
// };
//
// verify = async (token) => {
// 	return await jwt.verify(token, JWT_SECRET);
// };

export default {
	async genToken(data){
		return await jwt.sign(data, JWT_SECRET);
	},

	async verify(token){
		return await jwt.verify(token, JWT_SECRET);
	}
};
