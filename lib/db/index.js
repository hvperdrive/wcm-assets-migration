const connect = require("./connect");
const modelsInit = require("./models");
const gfsinit = require("./gridFs");

module.exports.initialize = async(connectionString) => {
    const connection = await connect(connectionString);
    const models = modelsInit(connection);
    const gfs = await gfsinit(connection);

    return {
        connection,
        models,
        gfs
    }
}

