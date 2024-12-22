import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
     name:{
        type: String,
        required: [true, "UserName is required"],
     },
     email :{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email address']
     },
     password:{
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"]
     },
     photo:{
        type: String,
        default: 'https://postimg.cc/QVqkr8vd.jpg'
     },
     
     bio : {
        type: String,
        default: "I am a new user",
     },

     role: {
        type: String,
        default: "user",
        enum: ["user", "admin", "creator"],
     },

     isVerified :{
        type: Boolean,
        default: false,
     },
},

{ timestamps: true , minimize: true });

//encrypt password
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model("User", UserSchema);

export default User;