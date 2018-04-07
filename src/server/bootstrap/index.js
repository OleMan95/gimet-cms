const mongoose = require('mongoose');
const CONNECTION_URL = "mongodb://admin:Oleman9291@ds247077.mlab.com:47077/gimet_db";

mongoose.Promise = Promise;
mongoose.set('debug', true);

mongoose.connect(CONNECTION_URL)
.then(()=>console.log('MongoDB has started...\n'))
.catch(err => {
    console.error(err.message);
    process.exit(1);
});