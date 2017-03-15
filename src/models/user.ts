import mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    password: { type: String, required: true },
    email: { type: String, required: true }
});


/**
 * 数据实体层
 */
interface IUser extends mongoose.Document {
    email: String;
    password: String;
}

var userModel = mongoose.model<IUser>('User', userSchema);

export { userModel }