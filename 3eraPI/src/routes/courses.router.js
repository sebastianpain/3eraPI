import { Router } from 'express';
import coursesController from '../controllers/courses.controller.js';
//import coursesManager from '../dao/dbManagers/courses.js'
//import { coursesService } from '../repositories/services.js';
import applyPolicy from '../dao/middleware/auth.middleware.js';

const router = Router();
//const coursesManager = new Courses();

router.get('/',applyPolicy(['STUDENT']),coursesController.getCourses)

router.post('/',applyPolicy(['TEACHER']), coursesController.createCourse)
/*async(req,res)=>{
     const {title, description} =req.body;
 let newCorse ={
    title,
    description,
    users:[],
    teeacher:'sin asignar'
 }
    const result = await coursesManager.saveCourses(newCourses);
})
res.send({status:"success",payload:result});
}*/

export default router;

