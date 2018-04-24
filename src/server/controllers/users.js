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

			const {str, srchby} = req.query;
			if(str && srchby){
				const filter = {[srchby]: new RegExp(str, 'ig') };
				res.send(await User.find(filter).select({password:0, __v: 0}));
			}else{
				res.send(await User.find().select({password:0, __v: 0}));
			}

		}catch(err){
			res.status(403).send({ error: err});
		}
	}
	//POST /auth/signin
	async signin(req, res){
		const { email, password, lc2 } = req.body;
		try{
			if(lc2 && lc2 > 3){
				res.status(403).send({ error: 'Forbidden!'});
				return;
			}else if(!lc2){
				res.status(403).send({ error: 'Forbidden!'});
				return;
			}

			if(!email || !password){
				res.status(400).send({ error: 'Invalid data' });
				return;
			}
			const user = await User.findOne({email});

			if(!user){
				res.status(400).send({error:'User not found'});
				return;
			}
			if(!user.isAdmin){
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
			const id = req.query.id || ObjectId(payload._id);

			if(req.query.populate){
				res.send(await User.findById(id).select({password:0, __v: 0}).populate('experts'));
			}else{
				res.send(await User.findById(id).select({password:0, __v: 0}));
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
		console.log('req.query.id: ',req.query.id);

		try{
			const payload = await jwtService.verify(authorization);
			console.log('payload: ',payload);
			const id = req.query.id || ObjectId(payload._id);
			const data = req.body;

			res.send(await User.findByIdAndUpdate(id, data, {new:true}).select({password:0, __v: 0}));
		}catch(err){
			res.status(500).send({ error: err});
		}
	}
	//DELETE /users?id=id
	async deleteOne(req, res){
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