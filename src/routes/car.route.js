import { Router } from 'express'
import carController from '../controllers/car.controller.js'
import { validateCar } from '../validators/car.schema.js'
import {upload} from '../config/multer.config.js'
import { upload } from './../config/multer.config';
const carRoute = Router()

carRoute.get('/', carController.getAllCars)
carRoute.post('/',upload.single('image') ,validateCar ,carController.createCar)
carRoute.get('/:id', carController.getCarById)
carRoute.patch('/:id', upload.single('image') ,validateCar ,carController.updateCar)
carRoute.delete('/:id', carController.deleteCar)

export default carRoute
