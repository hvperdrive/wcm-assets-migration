module.exports = ({ AssetsModel }, uuids) => AssetsModel.find({ uuid: { $in: uuids } }, { uuid: 1 }).lean().exec();