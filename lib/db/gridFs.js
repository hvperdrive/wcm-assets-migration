const Grid = require("gridfs-stream");

module.exports = (mongooseInstance) => new Grid(mongooseInstance.connection.db, mongooseInstance.mongo);