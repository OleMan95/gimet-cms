import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-node');
import uniqueValidator from 'mongoose-unique-validator';

mongoose.plugin(uniqueValidator);

const UserSchema = new Schema({
    name:{
        type:String,
        // Указывает на то, что поле обязательно.
        // В строке указывается сообщение при ошибке.
        required:'Name is required'
    },
    email:{
        type:String,
        unique:'User with email "{VALUE}" already exist.',
        lowercase:true,
        required:'Email is required'
    },
    password:{
        type:String,
        required:'Password is required'
    },
    experts:[{
        type: Schema.ObjectId,
        ref: 'Expert' // Это поле имеет ссылку на таблицу экспертов
    }]
},{timestamps:true});

UserSchema.set('toJSON', {versionKey:false});

UserSchema.statics.createFields = ['name', 'email', 'password', 'experts'];

UserSchema.pre('save', function(next){
	if (!this.isModified('password')){
		return next();
	}

	const salt = bcrypt.genSaltSync(10);
	this.password = bcrypt.hashSync(this.password, salt);
	next();
});

UserSchema.methods.comparePasswords = function(password){
	return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('User', UserSchema);