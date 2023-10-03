export default class CoursesRopository{

    constructor(dao){
        this.dao = dao;
    }

    getAllCourses =()=>{
        return this.dao.getAll();

    }
    getCourseById=()=>{
        return this.dao.get.getBy(id)
    };
    createCourse=(course)=>{
        return this.dao.saveCourses(course)
    }
updateCourse=()=>{
    return this.dao.updateCourse(id,course)
}

}