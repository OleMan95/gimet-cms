import Expert from '../models/expert';
import User from '../models/user';
import {Types} from 'mongoose';
import jwtService from '../services/jwt-service';
const ObjectId = Types.ObjectId;

class Experts{
	//GET /v1/experts private
	async find(req, res){
		const {authorization} = req.headers;
		try{
			await jwtService.verify(authorization);
			const {str, srchby} = req.query;

			if(str && srchby){
				const filter = {[srchby]: new RegExp(str, 'ig') };
				res.send(await Expert.find(filter).select({password:0, __v: 0}));
			}else{
				res.send(await Expert.find().select({password:0, __v: 0}));
			}

		}catch(err){
			res.status(500).send({message: err.message});
		}
	}
	//GET /v1/experts/:id
	async findById(req, res){
		try{
			if(!req.cookies.aat || req.cookies.aat != 'true'){
				res.status(400).send({message:'Rejected'});
				return;
			}
			// const {authorization} = req.headers;
			// const payload = await jwtService.verify(authorization);
			// const authorId = payload._id;

			const id = ObjectId(req.params.id);
			const expert = await Expert.findById(id).select({__v: 0});

			// make for creating or updating of the expert
			// if(expert.author.toString().trim() != authorId.toString().trim()) throw new Error('Forbidden');

			res.send(expert);
		}catch(err){
			res.status(403).send({message: err.message});
		}
	}
	//POST /v1/experts or PUT /experts/:id
	async createOrUpdate(req, res){
		try{
			if(!req.cookies.aat || req.cookies.aat != 'true'){
				res.status(400).send({message:'Rejected'});
				return;
			}

			const payload = await jwtService.verify(req.headers.authorization);
			const user = await User.findById(payload._id);
			const {id} = req.params;
			const {name, description, questions, contributors} = req.body;
			const author = req.body.author ? req.body.author : user._id;

			const data = {name, description, questions, author, contributors};

			let expert = {};

			if(id){
				Expert.findByIdAndUpdate(id, { $set: {name, description, questions, author, contributors}}, { new: true }, function (err, expert) {
					if (err) console.log('err: ', err);
					res.send(expert);
				});
			}else{
				expert = new Expert(data);
				expert = await expert.save();
				user.experts.push(ObjectId(expert._id));

				User.findByIdAndUpdate({_id: payload._id}, user, { new: true }, function (err, user) {
					if (err) console.log('err: ', err);
					res.send(expert);
				});
			}

			// res.send(expert);
		}catch (err){
			res.status(500).send({message: err.message});
		}

	}
	//PUT /expert/:id?expertId=<num>
	// async update(ctx, next){
	// 	if(!ctx.user){
	// 		ctx.throw(403, {message:'Forbidden'});
	// 		ctx.body = ctx.user;
	// 		return next();
	// 	}
	// 	const {id} = ctx.params;
	// 	const data = ctx.request.body;
	//
	// 	ctx.status = 200;
	// 	ctx.body = await User.findByIdAndUpdate(ctx.query.expertId, data, {new:true});
	// 	return next();
	// }
	//DELETE /expert/:id?expertId=<num>
	// async delete(ctx, next){
	// 	const {authorization} = ctx.headers;
	// 	const payload = await jwtService.verify(authorization);
	// 	const {id} = ctx.params;
	// 	const user = await User.findById({_id: ObjectId(payload._id)});
	// 	const userExperts = user.experts;
	//
	// 	let index;
	// 	for(let i=0;i<userExperts.length;i++){
	// 		if(userExperts[i] == id){
	// 			// удаление эксперта в общем списке
	// 			let {deletedCount} = await Expert.deleteOne({_id: ObjectId(id)});
	// 			userExperts[i] = deletedCount === 1 ? undefined : userExperts[i];
	// 			index = deletedCount === 1 ? i : null;
	// 		}
	// 	}
	//
	// 	if(index){
	// 		// удаление эксперта у пользователя
	// 		await User.findByIdAndUpdate(payload._id, {experts: userExperts});
	// 		ctx.status = 200;
	// 	}
	// 	else ctx.status = 204;
	// }
}
export default Experts;