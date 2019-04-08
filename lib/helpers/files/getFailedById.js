module.exports = async ({ MigrationErrorModel }, uuids) => {
    const matchedMigrationErrors = await MigrationErrorModel.find({
        "file._id": {
            $in: uuids
        }
    }, { "file._id": 1 }).lean().exec();

    return matchedMigrationErrors.map((error) => error.file);
}