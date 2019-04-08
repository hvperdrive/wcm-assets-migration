const getAssetCount = require("./assets/getCount");
const runAssetsBatch = require("./assets/runBatch");

const getFilesCount = require("./files/getCount");
const runFilesBatch = require("./files/runBatch");

const config = require("../../config");

module.exports = async (sourceDB, destDB) => {

    // Copy all assets
    console.log(`STARTING STAGE 1: COPYING ALL ASSETS`);

    const sourceAssetsCount = await getAssetCount(sourceDB.models);

    console.log(`Total count assets to be moved: ${sourceAssetsCount}`);

    const runAssets = async(startIndex) => {
        await runAssetsBatch(sourceDB, destDB, startIndex, config.batchSize);

        if ((startIndex + config.batchSize) < sourceAssetsCount) {
            await runAssets(startIndex + config.batchSize);
        }
    };
    
    await runAssets(0);
    
    console.log(`STAGE 1: SUCCEEDED`);

    // Copy all remaining files
    console.log(`STARTING STAGE 2: COPY REMAINING FILES (thumbnails etc)`);

    const sourceFilesCount = await getFilesCount(sourceDB.models);

    console.log(`Total count remaining files to be moved: ${sourceFilesCount}`);

    const runFiles = async(startIndex) => {
        await runFilesBatch(sourceDB, destDB, startIndex, config.batchSize);

        if ((startIndex + config.batchSize) < sourceFilesCount) {
            await runFiles(startIndex + config.batchSize);
        }
    };
    
    await runFiles(0);

    console.log(`STAGE 2: SUCCEEDED`);
};