"use strict";
import User from '../models/user';
import Expert from '../models/expert';
import {Types} from 'mongoose';
import jwtService from '../services/jwt-service';
// import pick from 'lodash/pick';

const ObjectId = Types.ObjectId;

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
	//POST /auth/signin
	async signin(req, res){
		const { email, password } = req.body;
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
	//GET /user
	async findOne(req, res){
		const {authorization} = req.headers;
		try{
			const payload = await jwtService.verify(authorization);
			console.log('payload: ',payload);
			const id = ObjectId(payload._id);
			const fields = req.query.fields || '';

			if(req.query.populate){
				res.send(await User.findById(id, fields).populate('experts'));
			}else{
				res.send(await User.findById(id, fields));
			}


		}catch(err){
			res.status(403).send({ error: err});
		}
	}

}

export default Users;