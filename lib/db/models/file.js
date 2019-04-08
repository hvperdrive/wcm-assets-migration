const { Schema } = require("mongoose");

module.exports.get = (mongooseInstance) => {
    // Let MongoDB define all the required fields
    const Files = new Schema({}, { strict: false });

    // Set the name of the collection
    Files.set("collection", "fs.files");

    return mongooseInstance.model("File", Files);
}
