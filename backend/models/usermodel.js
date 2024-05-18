// import mongoose
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minLength: 3,
    maxLength: 28,
  },
  email: {
    type: String,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
    message: (props) => `${props.value} is not a valid email!`,
  },
  password: {
    type: String,
  },
  profilePic: {
    type: String,
    default: "https://pbs.twimg.com/media/FiTxdZlVEAIDSao.jpg",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
