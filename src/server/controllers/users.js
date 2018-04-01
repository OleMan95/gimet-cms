"use strict";
import User from '../models/user';
import Expert from '../models/expert';
import {Types} from 'mongoose';
import jwtService from '../services/jwt-service';
import pick from 'lodash/pick';

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
				res.send(await User.find(filter).select({password:0, __v: 0}));
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
	// POST /auth/signup
	async signup(req, res){
		try{
			const {_id} = await User.create(pick(req.body, User.createFields));
			const user = await User.findById({_id}).select({password:0, __v: 0});
			res.send({ data: user });
		}catch(err){
			res.status(500).send({ error: err});
		}
	}
	//PUT /users
	async update(req, res){
		const {authorization} = req.headers;
		try{
			const payload = await jwtService.verify(authorization);
			console.log('payload: ',payload);
			const id = ObjectId(payload._id);
			const data = req.body;

			res.send(await User.findByIdAndUpdate(id, data, {new:true}).select({password:0, __v: 0}));
		}catch(err){
			res.status(500).send({ error: err});
		}
	}
	//DELETE /users?id=id
	async delete(req, res){
		const {authorization} = req.headers;
		try{
			const payload = await jwtService.verify(authorization);
			const {id} = req.query;

			const user = await User.findById(id);
			if(!user) res.status(204).send({error: 'User not found!'});

			const userExperts = user.experts;
			for(let i=0;i<userExperts.length;i++){
				await Expert.deleteOne({_id: ObjectId(userExperts[i])});
			}
			res.send(await User.deleteOne({_id: ObjectId(id)}));
		}catch(err){
			res.status(500).send({ error: err});
		}
	}
}

export default Users;