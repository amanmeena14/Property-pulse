import {Schema, model, models} from 'mongoose';
import { StringDecoder } from 'string_decoder';

const UserSchema= new Schema({
    email:{
        type: String,
        unique: [true,'Email already Existed'],
        required: [true,'Email is requried']
    },
    username:{
        type: String,
        required: [true,'Username is required']
    },
    image:{
        type: String
    },
    bookmarks: [{
        type: Schema.Types.ObjectId,
        ref: 'Property'
    }]
},{
    timestamps: true
});

const User = models.User || model('User',UserSchema);

export default User;