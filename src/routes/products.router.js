import {Router} from 'express';
import Users from '../dao/dbManagers/users.js';
import Courses from '../dao/dbManagers/courses.js';

const usersManager = new Users();
const productsManager = new Courses();
const router = Router();



router.get('/', async (req,res)=>{
    let products = await usersManager.getAll();
    if(!products) return res.status(500).send({status:"error",error:"Couldn't get users due to internal error"})
    res.send({status:"success",payload:products})
});

router.post('/',async(req,res)=>{
    let {productName,productMaterial} = req.body;
    if(productName||!productMaterial) return res.status(400).send({status:"error",error:"Incomplete values"})
    let result = await productManager.saveUser({
        productName,
        productMaterial,
        
    })
    if(!result) return res.status(500).send({status:"success",payload:result})
    res.send({status:"success",payload:result})
})

router.post('/:uid/products/:cid',async(req,res)=>{
    const {uid,cid} = req.params;
    const product = await productsManager.getById(cid);
    if(!product) return res.status(404).send({status:"error",error:"Course not found"})
    const user = await productsManagerManager.getBy({_id:uid});
    if(!user) return res.status(404).send({status:"error",error:"User not found"});

    let productsExists = user.courses.some(c=>c._id.toString()===cid);
    if(productsExists) return res.status(400).send({status:"error",error:"The user is already registered in this course"});

    user.products.push(course._id);
    products.users.push(user._id);
    await productsManager.updateUser(uid,user);
    await productsManager.updateProduct(cid,user);
    res.send({status:"success",message:"User added to product"})
})
router.get('/test',(req,res)=>{
    let first_name = faker.name.productName();
    let last_name = faker.name.productMaterial();
    
    res.send({productName,productMaterial})
})
router.post('api/users/:uid/documents',(req,res)=>{

})


 
  
export default router;