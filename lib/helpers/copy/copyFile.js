const { promisify } = require("util");
const { Types } = require("mongoose");

module.exports = async(sourceDB, destDB, id) => {
    const query = { _id: new Types.ObjectId(id) };

    const file = await promisify((query, cb) => sourceDB.gfs.files.findOne(query, cb))(query);

    const rs = sourceDB.gfs.createReadStream(query);
    const ws = destDB.gfs.createWriteStream(file);

    rs.pipe(ws);

    return new Promise((resolve, reject) => {
        ws.on("close", (item) => resolve(item));
        ws.on("error", (err) => reject(err));
    });
}