import Car from '../models/car.model.js'
import checkValidObjectId from '../utils/checkId.js'

const getAllCars = async (req, res, next) => {
	try {
		const cars = await Car.find()
		res.status(200).json({ message: 'success', data: cars })
	} catch (error) {
		next(error)
	}
}

const getCarById = async (req, res, next) => {
	try {
		const { id } = req.params
		checkValidObjectId(id)

		const car = await Car.findById(id)

		if (!car) {
			return res.status(404).json({ message: 'Bunday user mavjud emas' })
		}

		res.status(201).json({ message: 'success', data: car })
	} catch (error) {
		next(error)
	}
}

const createCar = async (req, res, next) => {
	try {
		const { model, brand, category, year, price, available } = req.body

		const car = new Car({ model, brand, category, year, price, available })

		car.save()
		if (!car) {
			return res.status(404).json({ message: 'Car yaratishda hatolik' })
		}

		res.status(200).json({ message: 'success', data: car })
	} catch (error) {
		next(error)
	}
}

const updateCar = async (req, res, next) => {
	try {
		const { id } = req.params
		const { model, brand, category, year, price, available } = req.body
		checkValidObjectId(id)
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
		next(error)
	}
}

const deleteCar = async (req, res, next) => {
	try {
		const { id } = req.params
		checkValidObjectId(id)
		const car = await Car.findByIdAndDelete(id)

		if (!car) {
			return res.status(404).json({ message: 'Bunday mashinda mavjud emas' })
		}

		res
			.status(201)
			.json({ message: "Car muvaffaqiyatli o'chirildi", data: car })
	} catch (error) {
		next(error)
	}
}

export { createCar, deleteCar, getAllCars, getCarById, updateCar }
