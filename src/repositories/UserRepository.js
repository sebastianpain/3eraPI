export default class UserRopository{

    constructor(dao){
        this.dao = dao;
    }

    getAllUsers =()=>{
        return this.dao.getAll();

    }
    getUserById=(param)=>{
        return this.dao.getById(param)
    };
    createUser=(user)=>{
        return this.dao.saveUser(user)
    }
updateUser=(id,user)=>{
    return this.dao.updateUser(id,user)
}

}