import { Router } from 'express'
import carModel from '../models/car.model.js'

const pageRouter = Router()

pageRouter.get('/',async (req, res) => {
  const cars = await carModel.find();
	res.render('menu',{cars})
})

pageRouter.get('/car-info',(req,res)=>{
	res.render('cadilakt')
})

pageRouter.get('/car_malibu',(req,res)=>{
	res.render('malibu')
})

pageRouter.get('/auth/login', (req, res) => {
	res.render('login', { error: null })
})

pageRouter.get('/auth/register', (req, res) => {
	res.render('register', { error: null })
})

pageRouter.get('/auth/forgot-password', (req, res) => {
	const token = req.query.token
	res.render('forgot-password', { error: null, message: null, token })
})

pageRouter.get('/auth/reset-password', (req, res) => {
	const token = req.query.token
	res.render('reset-password', { error: null, message: null, token })
})

pageRouter.get('/auth/profile', (req, res) => {
	res.render('profile', { data: null })
})

export default pageRouter
