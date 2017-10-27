import mongoose from "mongoose";

/*
 type User {
 lat: String
 lng: String
 username: String
 karma: Int
 educationalInstitution: String
 }
 */
const UserSchema = new mongoose.Schema({
    lat: {
        type: String
    },
    lng: {
        type: String
    },
    name: {
        type: String,
        index: true
    },
    email: {
        type: String
    },
    karma: {
        type: Number,
        index: true
    },
    password: {
      type: String
    }

});

const User = mongoose.model('User', UserSchema);

export default User;
