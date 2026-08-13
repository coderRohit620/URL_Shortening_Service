
import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema(
    {
        full_url: {
            type: String,
            required: true,
        },
        short_url: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        click: {
            type: Number,
            required: true,
            default: 0,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true,
    }
);

export const Url = mongoose.model("Url", urlSchema);