const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpertSchema = new Schema({
	name:{
		type:String,
		required:'Name is required'
	},
	description:String,
	questions:[],
	contributors:[String],
	author:{
		type: Schema.ObjectId,
		ref: 'User',
		required:'Author is required'
	}
},{timestamps:true});

ExpertSchema.set('toJSON', {versionKey:false});

ExpertSchema.statics.initFields = ['name', 'description', 'questions', 'author'];

// ExpertSchema.statics.findOneWithPublicFields = function(params, cb){
// 	return this.getUser(params, cb).select({__v: 0});
// };

const Expert = mongoose.model('Expert', ExpertSchema);

module.exports = Expert;