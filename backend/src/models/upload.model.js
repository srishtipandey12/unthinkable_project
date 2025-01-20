import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const uploadSchema = new Schema(
  {
    file: {
      type: String,
      required: true, 
    },
    fileType: {
      type: String,
      enum: ["pdf", "image"], 
      required: true,
    },
    title: {
      type: String,
      required: true, 
    },
    description: {
      type: String, 
    },
    extractedText: {
      type: String, 
    },
    summary: {
      short: { type: String }, 
      medium: { type: String }, 
      long: { type: String }, 
    },
    highlightedPoints: {
      type: [String],
    },
    isProcessed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } 
);

uploadSchema.plugin(mongooseAggregatePaginate);

export const File = mongoose.model("File", uploadSchema);
