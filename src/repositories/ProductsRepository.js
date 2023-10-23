export default class ProductsRopository{

    constructor(dao){
        this.dao = dao;
    }

    getAllProducts =()=>{
        return this.dao.getAll();

    }
    getProductById=(id)=>{
        return this.dao.getBy(id)
    };
    createProduct=(course)=>{
        return this.dao.saveCourses(course)
    }
updateProduct=(id,course)=>{
    return this.dao.updateCourse(id,course)
}

}