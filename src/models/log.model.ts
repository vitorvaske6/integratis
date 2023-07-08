
import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface LogInput {
    user:       UserDocument['_id'];
    index:      string;
    message:    string;
    code:       number;
    rows:       string;
    script:     string;
    company:    string;
    runnedAt:   string;
};

export interface LogDocument extends LogInput, mongoose.Document {
    createdAt:      Date;
    updatedAt:      Date;
};

const LogSchema = new mongoose.Schema({
    user:       { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    index:      { type: Number, required: true },
    message:    { type: String, required: true },
    code:       { type: Number, required: true },
    rows:       { type: String, required: true },
    script:     { type: String, required: true },
    company:    { type: String, required: true },
    runnedAt:   { type: String, required: true },

}, {
    timestamps: true
});

const LogModel = mongoose.model<LogDocument>("Log", LogSchema);

export default LogModel;

