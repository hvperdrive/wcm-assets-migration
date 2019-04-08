const assetsModel = require("./asset");
const fileModel = require("./file");
const migrationError = require("./migrationError");

module.exports = (mongooseInstance) => ({
    AssetsModel: assetsModel.get(mongooseInstance),
    FileModel: fileModel.get(mongooseInstance),
    MigrationErrorModel: migrationError.get(mongooseInstance),
});