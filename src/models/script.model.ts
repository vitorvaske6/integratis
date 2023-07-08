
import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface ScriptInput {
    user:           UserDocument['_id'];
    title:          string;
    description:    string;
    path:           string;
    cron:           string;
    requiredParams: string;
};

export interface ScriptDocument extends ScriptInput, mongoose.Document {
    createdAt:      Date;
    updatedAt:      Date;
};

const ScriptSchema = new mongoose.Schema({
    user:           { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    title:          { type: String, required: true },
    description:    { type: String, required: false },
    path:           { type: String, required: true },
    cron:           { type: String, required: true },
    requiredParams: { type: String, required: false },

}, {
    timestamps: true
});

const ScriptModel = mongoose.model<ScriptDocument>("Script", ScriptSchema);

export default ScriptModel;

