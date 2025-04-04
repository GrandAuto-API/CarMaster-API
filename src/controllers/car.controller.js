import { BaseException } from '../exception/BaseException.js'
import Car from '../models/car.model.js'
import checkValidObjectId from '../utils/checkId.js'

// Get all cars
const getAllCars = async (req, res, next) => {
	try {
		const cars = await Car.find()
		res.status(200).json({ message: 'success', data: cars })
	} catch (error) {
		next(error)
	}
}

// Get car by ID
const getCarById = async (req, res, next) => {
	try {
		const { id } = req.params
		checkValidObjectId(id) // To check if the provided ID is valid

		const car = await Car.findById(id)

		if (!car) {
			return res.status(404).json({ message: 'Bunday user mavjud emas' }) // Fixed the message typo ("user" should be "car")
		}

		res.status(201).json({ message: 'success', data: car })
	} catch (error) {
		next(error)
	}
}

// Create car
const createCar = async (req, res, next) => {
	try {
		const { model, brand, category, year, price, available } = req.body

		const car = new Car({ model, brand, category, year, price, available })

		await car.save()
		if (!car) {
			throw new BaseException('Car yaratishda hatolik', 400)
		}

		res.json({ message: 'success', data: car })
	} catch (error) {
		next(error)
	}
}

// Update car
const updateCar = async (req, res, next) => {
	try {
		const { id } = req.params
		const { model, brand, category, year, price, available } = req.body
		checkValidObjectId(id) // ID validation

		const car = await Car.findByIdAndUpdate(
			id,
			{ model, brand, category, year, price, available },
			{ new: true }
		)

		res.json({ message: 'success', data: car })
	} catch (error) {
		next(error)
	}
}

// Delete car
const deleteCar = async (req, res, next) => {
	try {
		const { id } = req.params
		checkValidObjectId(id) // ID validation

		const car = await Car.findByIdAndDelete(id)

		if (!car) {
			throw new BaseException("Car o'chirishda hatolik", 404)
		}

		res
			.status(201)
			.json({ message: "Car muvaffaqiyatli o'chirildi", data: car })
	} catch (error) {
		next(error)
	}
}

export { createCar, deleteCar, getAllCars, getCarById, updateCar }
