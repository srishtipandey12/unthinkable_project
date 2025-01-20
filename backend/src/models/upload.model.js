import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const uploadSchema = new Schema(
  {
    file: {
      type: String,
      required: true, // Cloudinary URL of the file
    },
    fileType: {
      type: String,
      enum: ["pdf", "image"], // Restrict file types to "pdf" or "image"
      required: true,
    },
    title: {
      type: String,
      required: true, // Title of the file (can default to the file name)
    },
    description: {
      type: String, // Optional description of the file
    },
    extractedText: {
      type: String, // Text extracted from the file (if applicable)
    },
    summary: {
      short: { type: String }, // Short summary
      medium: { type: String }, // Medium-length summary
      long: { type: String }, // Long summary
    },
    highlightedPoints: {
      type: [String], // Array of key points highlighted in the file
    },
    isProcessed: {
      type: Boolean,
      default: false, // Indicates if the file has been processed for text extraction
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

uploadSchema.plugin(mongooseAggregatePaginate);

export const File = mongoose.model("File", uploadSchema);
