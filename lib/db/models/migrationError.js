const uuid = require("node-uuid");
const { Schema } = require("mongoose")

module.exports.get = (mongooseInstance) => {
    const MigrationError = new Schema({
        uuid: {
            type: String,
            required: true,
            default: uuid.v4
        },
        asset: {
            type: Object,
        },
        file: {
            type: Object,
        },
        error: {}
    }, { strict: false });

    // Set the name of the collection
    MigrationError.set("collection", "migrationError");

    return mongooseInstance.model("MigrationError", MigrationError);
}
