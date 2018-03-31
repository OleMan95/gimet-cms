"use strict";
import User from '../models/user';
// import ObjectId from 'mongoose'.Types.ObjectId;
// import pick from 'lodash/pick';
import jwtService from '../services/jwt-service';


class Users{
	//POST /users
	async find(req, res){
		const {authorization} = req.headers;
		try{
			const payload = await jwtService.verify(authorization);
			console.log('payload: ',payload);

			if(payload._id){
				const filter = req.body.filter || {};
				res.send(await User.find(filter));
			}else{
				res.status(403).send({ error: 'Forbidden!' });
			}
		}catch(err){
			res.status(403).send({ error: 'Forbidden!'});
		}
	}
	// POST /auth/signin
	async signin(req, res){
		const { email, password } = req.body;
		console.log(req.body);
		try{
			if(!email || !password){
				res.status(400).send({ error: 'Invalid data' });
				return;
			}
			const user = await User.findOne({email});

			if(!user){
				res.status(400).send({error:'User not found'});
				return;
			}
			if(!user.comparePasswords(password)){
				res.status(400).send({error: 'Invalid data'});
				return;
			}

			const token = await jwtService.genToken({
				_id: user._id,
				name: user.name,
				email: user.email
			});

			res.send({data:{token}});
		}catch(err){
			res.status(400).send({ error: err});
		}
	}
}

export default Users;