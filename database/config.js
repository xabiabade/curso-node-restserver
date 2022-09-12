const mongoose = require('mongoose');


const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.MONGODB);

        console.log('ONLINE');
    } catch (error) {
        console.log(error);
        throw new error('Error al iniciar la base de datos');
    }
}

module.exports = {
    dbConnection
}