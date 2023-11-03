import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const userCollection = 'Users';

  
const usersSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    dni:Number,
    birthDate:Date,
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:["M","F"]
    },
    role:{
        type: String, enum: ['user', 'premium', 'admin'], default: 'user',
    },
    courses:{
        type:[
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref:'Courses'
            }
        ],
        default:[]
    },

})

export const userModel = mongoose.model(userCollection,usersSchema);