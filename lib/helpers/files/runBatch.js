const { differenceWith } = require("ramda");
const getFiles = require("./getPaginated");
const getFilesByIds= require("./getById");
const getFailedFilesByIds = require("./getFailedById");
const copy = require("../copy/copyFile");
const logError = require("../logError");

const deltaCompare = (sourceFile, destFile) => sourceFile._id.toString() === destFile._id.toString();

module.exports = async (sourceDB, destDB, skip, limit) => {
    console.log(`Running batch ${skip} - ${skip + limit - 1}`);

    const sourceFiles = await getFiles(sourceDB.models, skip, limit);
    const sourceFilesUuid = sourceFiles.map((file) => file._id);
    const filesAlreadyInDestintation = await getFilesByIds(destDB.models, sourceFilesUuid);
    const filesThatFailedBefore = await getFailedFilesByIds(destDB.models, sourceFilesUuid);

    const filesToSave = differenceWith(deltaCompare, sourceFiles, filesAlreadyInDestintation.concat(filesThatFailedBefore));

    console.log(filesToSave.length);

    const promises = filesToSave.map((file) => copy(sourceDB, destDB, file._id)
        .then((value) => ({ value, status: "fulfilled" }))
        .catch(async(error) => {
            await logError(destDB.models, { error, file });
            throw { error, status: "rejected" };
        })
    );

    return Promise.all(promises)
        .then((results) => {
            const errors = results.filter((result) => result.status === "rejected");

            if (errors.length) {
                throw errors;
            }
        });
};