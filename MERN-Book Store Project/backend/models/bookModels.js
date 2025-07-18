import mongoose from "mongoose";

const BookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        publishYear: {
            type: Number,
            required: true
        },
        etlogKoMalaki: {
            type: String,
            required: true
        }
    }
);


export const Book = mongoose.model('Cat', BookSchema);