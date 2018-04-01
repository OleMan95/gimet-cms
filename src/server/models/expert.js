import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ExpertSchema = new Schema({
    name:{
        type:String,
        lowercase:true,
        // Указывает на то, что поле обязательно.
        // В строке указывается сообщение при ошибке.
        required:'Name is required'
    },
    description:String,
    questions:[],
    author:{
        type: Schema.ObjectId,
        ref: 'User',
        required:'Author is required'
    }
},{timestamps:true});

ExpertSchema.set('toJSON', {versionKey:false});

ExpertSchema.statics.createFields = ['name', 'description', 'questions', 'author'];

const Expert = mongoose.model('Expert', ExpertSchema);

export default Expert;