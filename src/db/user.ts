import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false }
    }
});

export const UserModel = mongoose.model("User", UserSchema);

//! สร้าง medthod การทำงานของ model
export const getUser = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email:email });
export const getUserBysessionToken = (sessionToken: string) => UserModel.findOne({
    "authentication.sessionToken": sessionToken
});
export const getUserById = (id: string) => UserModel.findById({ _id: id })

export const createUser = (values: Record<string, any>) => new UserModel(values)
    .save()
    .then((user) => user.toObject());
    
export const deleteUserById = (id: string) => UserModel.findOneAndRemove({ _id: id });
export const updateUser = async (id: string, values: Record<string, any>) => await UserModel
    .findByIdAndUpdate(id, values);
    // npm start