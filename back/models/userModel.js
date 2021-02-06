import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timeStaps: true }
);

// Creating method for check if hashed password matches entered password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Hash & salt passwords before save
userSchema.pre("save", async function (next) {
  // If password is not changed - Only when changing password or creating new user
  if (!this.isModified("password")) {
    next();
  }
  // Generate salt
  const salt = await bcrypt.genSalt(10);
  // Replace password with encrypted password
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
