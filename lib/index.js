const config = require("../config");
const { runMigration } = require("./helpers");
const { initialize } = require("./db");

module.exports.run = async () => {
    const sourceDB = await initialize(config.mongo.sourceConnectionString);
    const destinationDB = await initialize(config.mongo.destinationConnectionString);

    await runMigration(sourceDB, destinationDB).catch((error) => {
        console.log(error);
        process.exit(1)
    });

    process.exit(0);
}