const { Mongoose } = require("mongoose");

module.exports = (connectionString) => {
    const mongooseInstance = new Mongoose();

    return mongooseInstance.connect(connectionString, {
        useNewUrlParser: true
    })
        .then(() => console.log(`Mongoose connected to: ${connectionString}`) || mongooseInstance)
        .catch((err) => console.log(`!!! Mongoose connection error for: ${connectionString}`, err));
};