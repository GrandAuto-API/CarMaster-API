import { Router } from 'express'
import carController from '../controllers/car.controller.js'
const carRoute = Router()

carRoute.get('/', carController.getAllCars)
carRoute.post('/', carController.createCar)
carRoute.get('/:id', carController.getCarById)
carRoute.patch('/:id', carController.updateCar)
carRoute.delete('/:id', carController.deleteCar)

export default carRoute
