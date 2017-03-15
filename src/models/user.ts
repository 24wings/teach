import mongoose = require('mongoose');


var playerSchema = new mongoose.Schema({
    name: String
});


/**
 * 数据实体层
 */
interface IPlayer extends mongoose.Document {
    name: String;
}

var playerModel = mongoose.model<IPlayer>('Player', playerSchema);

export { playerModel }