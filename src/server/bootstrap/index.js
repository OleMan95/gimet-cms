import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const CONNECTION_URL = process.env.DB_HOST;

mongoose.Promise = Promise;
mongoose.set('debug', true);

mongoose.connect(CONNECTION_URL)
.then(()=>console.log('MongoDB has started...\n'))
.catch(err => {
    console.error(err.message);
    process.exit(1);
});