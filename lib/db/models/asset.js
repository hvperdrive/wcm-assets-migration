const uuid = require("node-uuid");
const { Schema } = require("mongoose")

module.exports.get = (mongooseInstance) => {
    const AssetSchema = new Schema({
        uuid: {
            type: String,
            default: uuid,
            required: true,
            index: true
        },
        assetId: {
            type: String,
            required: true
        },
        fileName: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
            default: "temp"
        },
        thumbnail: {
            type: String
        },
        meta: {
            created: {
                type: Date,
                default: Date.now
            },
            lastEditor: {
                type: String,
                ref: "User"
            },
            title: {
                type: String,
                required: true,
                default: "No title"
            },
            description: {
                type: String
            },
            copyright: {
                type: String
            },
            width: {
                type: Number
            },
            height: {
                type: Number
            }
        }
    });

    // Set the name of the collection
    AssetSchema.set("collection", "assets");

    return mongooseInstance.model("Asset", AssetSchema);
}
