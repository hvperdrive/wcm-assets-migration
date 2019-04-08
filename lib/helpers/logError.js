module.exports = ({ MigrationErrorModel }, {
    asset,
    file,
    error,
} = {}) => new MigrationErrorModel({
    asset,
    file,
    error,
}).save();