import mongoose, { Schema } from "mongoose";
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: {
      type: String,
      default:
        "https://qph.cf2.quoracdn.net/main-qimg-86d2d1075e904b34f4168544245f5254-lq",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
