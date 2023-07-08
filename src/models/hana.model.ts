
import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface HanaInput {
    user:           UserDocument['_id'];
    query:          string;
    connOptions:    string;
};

export interface HanaDocument extends HanaInput, mongoose.Document {
    createdAt:  Date;
};

const HanaSchema = new mongoose.Schema({
    user:           { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    query:          { type: String, required: true },
    connOptions:    { type: String, required: true },
}, {
    timestamps: true
});

const HanaModel = mongoose.model<HanaDocument>("Hana", HanaSchema);

export default HanaModel;

