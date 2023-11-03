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
                ref:'User'
            }
        ],
        default:[]
    }
})
// Middleware para verificar permisos de eliminación de productos
productsSchema.pre('remove', async function (next) {
    const user = await userModel.findById(this.owner);

    if (user) {
        // Si el usuario es "admin", puede borrar cualquier producto
        if (user.role === 'admin') {
            return next();
        }

        // Si el usuario es "premium" y es el propietario del producto, puede borrarlo
        if (user.role === 'premium' && user._id.toString() === this.owner.toString()) {
            return next();
        }
    }

    // Si no se cumplen las condiciones anteriores, no se permite la eliminación
    next(new Error('No tiene permiso para eliminar este producto.'));
});

// Middleware para verificar permisos de modificación de productos
productsSchema.pre('save', async function (next) {
    const user = await userModel.findById(this.owner);

    if (user) {
        // Si el usuario es "admin", puede modificar cualquier producto
        if (user.role === 'admin') {
            return next();
        }

        // Si el usuario es "premium" y es el propietario del producto, puede modificarlo
        if (user.role === 'premium' && user._id.toString() === this.owner.toString()) {
            return next();
        }
    }

    // Si no se cumplen las condiciones anteriores, no se permite la modificación
    next(new Error('No tiene permiso para modificar este producto.'));
});


const productsModel = mongoose.model(productsCollection,productsSchema);
export default productsModel;
