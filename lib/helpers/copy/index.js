const moveFile = require("./copyFile");
const moveAsset = require("./copyAsset");
const logError = require("../logError");

module.exports = async (sourceDB, destDB, asset) => {
    try {
        await moveFile(sourceDB, destDB, asset.assetId);
        await moveAsset(destDB.models, asset);

        return {
            value: asset,
            status: "fulfilled",
        };
    } catch (error) {
        await logError(destDB.models, { error, asset });

        console.log(`Error for ${asset._id}`);

        throw {
            err: error,
            status: "rejected"
        };
    }
}