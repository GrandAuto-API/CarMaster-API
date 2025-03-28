import { Router } from 'express'
import {
	createCar,
	deleteCar,
	getAllCars,
	getCarById,
	updateCar,
} from '../controllers/car.controller.js'

const carRoute = Router()

carRoute.get('/', getAllCars)
carRoute.post('/', createCar)
carRoute.get('/:id', getCarById)
carRoute.patch('/:id', updateCar)
carRoute.delete('/:id', deleteCar)

export { carRoute }
