const mongoose = require('mongoose');


const connectDatabase = async () => {

    try {

        const conn = await mongoose.connect('mongodb+srv://admin:admin@cluster0.ipe2g.mongodb.net/studentRegistration', {

            useNewUrlParser: true,

            useUnifiedTopology: true

        });

        console.log(`Connected to MongoDB: ${conn.connection.host}`);

    }

    catch (err) {

        console.log(err);

        process.exit(1);

    }

}



module.exports = connectDatabase;