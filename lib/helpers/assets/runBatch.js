const { differenceWith } = require("ramda");
const getAssets = require("./getPaginated");
const getAssetsByUuids = require("./getByUuid");
const getFailedAssetsByUuids = require("./getFailedByUuid");
const copy = require("../copy");

const deltaCompare = (sourceAsset, destAsset) => sourceAsset.uuid === destAsset.uuid;

module.exports = async (sourceDB, destDB, skip, limit) => {
    console.log(`Running batch ${skip} - ${skip + limit - 1}`);

    const sourceAssets = await getAssets(sourceDB.models, skip, limit);
    const sourceAssetsUuid = sourceAssets.map((asset) => asset.uuid);
    const assetsAlreadyInDestintation = await getAssetsByUuids(destDB.models, sourceAssetsUuid);
    const assetsThatFailedBefore = await getFailedAssetsByUuids(destDB.models, sourceAssetsUuid);

    const assetsToSave = differenceWith(deltaCompare, sourceAssets, assetsAlreadyInDestintation.concat(assetsThatFailedBefore));

    return Promise.all(assetsToSave.map((asset) => copy(sourceDB, destDB, asset).catch((e) => e)))
        .then((results) => {
            const errors = results.filter((result) => result.status === "rejected");

            if (errors.length) {
                throw errors;
            }
        });
};