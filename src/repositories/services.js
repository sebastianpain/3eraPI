import Users from '../dao/dbManagers/users.js'
import Courses from '../dao/dbManagers/courses.js'
import Products from '../dao/dbManagers/products.js'
import UserRepository from './UserRepository.js'
import CoursesRepository from '../dao/dbManagers/courses.js'

const userDao = new Users();
const coursesDao = new Courses();
const productsDao = new Courses();

export const userService = new UserRepository(userDao)
export const coursesService = new CoursesRepository(coursesDao)
export const productsService = new ProductsRepository(productsDao)