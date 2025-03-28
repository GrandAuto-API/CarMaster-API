import Car from '../models/car.model.js'
import checkValidObjectId from '../utils/checkId.js'
import handlerServerError from '../utils/handlerError.js'

const getAllCars = async (req, res) => {
	try {
		const cars = await Car.find()
		res.status(200).json({ message: 'success', data: cars })
	} catch (error) {
		handlerServerError(error, res)
	}
}

const getCarById = async (req, res) => {
	try {
		const { id } = req.params
		checkValidObjectId(res, id)

		const car = await Car.findById(id)

		if (!car) {
			return res.status(404).json({ message: 'Bunday user mavjud emas' })
		}

		res.status(201).json({ message: 'success', data: car })
	} catch (error) {
		handlerServerError(error, res)
	}
}

const createCar = async (req, res) => {
	try {
		const { model, brand, category, year, price, available } = req.body

		const car = new Car({ model, brand, category, year, price, available })

		car.save()
		if (!car) {
			return res.status(404).json({ message: 'Car yaratishda hatolik' })
		}

		res.status(200).json({ message: 'success', data: car })
	} catch (error) {
		handlerServerError(error, res)
	}
}

const updateCar = async (req, res) => {
	try {
		const { id } = req.params
		const { model, brand, category, year, price, available } = req.body
		checkValidObjectId(res, id)
		const car = await Car.findByIdAndUpdate(id, {
			model,
			brand,
			category,
			year,
			price,
			available,
		})

		res.status(200).json({ message: 'success', data: car })
	} catch (error) {
		handlerServerError(error, res)
	}
}

const deleteCar = async (req, res) => {
	try {
		const { id } = req.params
		checkValidObjectId(res, id)
		const car = await Car.findByIdAndDelete(id)

		if (!car) {
			return res.status(404).json({ message: 'Bunday mashinda mavjud emas' })
		}

		res
			.status(201)
			.json({ message: "Car muvaffaqiyatli o'chirildi", data: car })
	} catch (error) {
		handlerServerError(error, res)
	}
}

export { createCar, deleteCar, getAllCars, getCarById, updateCar }
