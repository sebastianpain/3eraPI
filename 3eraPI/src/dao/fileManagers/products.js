import fs from 'fs';
import __dirname from '../../utils.js';

const path = __dirname+'/files/courses.json'
export default class Products{
    constructor(){
        console.log(`Trabajando en el archivo ${path}`)
    }
    getAll = async() =>{
        if(fs.existsSync(path)){
            try{
                let data = await fs.promises.readFile(path,'utf8');
                return JSON.parse(data);
            }
            catch(error){
                console.log("No puede guardar el archivo:"+error)
                return null;
            }
        }
        else{
            return [];
        }
    }
    saveCourse = async(product) =>{
        try{
            product.students = [];
            let products = await this.getAll();
            if(products.length===0){
                products.id=1;
                products.push(products)
                await fs.promises.writeFile(path,JSON.stringify(products,null,'\t'))
            }
            else{
                course.id = products[products.length-1].id+1;
                courses.push(product);
                await fs.promises.writeFile(path,JSON.stringify(courses,null,'\t'));
                return product;
            }
        }
        catch(error){
            console.log("No puede guardar el archivo: "+error)
            return null;
        }
    }
}