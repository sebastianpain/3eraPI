export default class CoursesRopository{

    constructor(dao){
        this.dao = dao;
    }

    getAllCourses =()=>{
        return this.dao.getAll();

    }
    getCourseById=(id)=>{
        return this.dao.getBy(id)
    };
    createCourse=(course)=>{
        return this.dao.saveCourses(course)
    }
updateCourse=(id,course)=>{
    return this.dao.updateCourse(id,course)
}

}