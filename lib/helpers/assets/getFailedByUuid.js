module.exports = async ({ MigrationErrorModel }, uuids) => {
    const matchedMigrationErrors = await MigrationErrorModel.find({
        "asset.uuid": {
            $in: uuids
        }
    }, { "asset.uuid": 1 }).lean().exec();

    return matchedMigrationErrors.map((error) => error.asset);
}