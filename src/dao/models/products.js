import mongoose from 'mongoose';

const productsCollection = 'products';

const productsSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    teacher:{
        type:String,
        required:true
    },
    owner:{
        name:String,
        default:"admin",
        type:[
            {
                type:mongoose.SchemaTypes.ObjectId,
                ref:'Users'
            }
        ],
        default:[]
    }
})

const productsModel = mongoose.model(productsCollection,productsSchema);
export default productsModel;
