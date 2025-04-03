import { Router } from 'express'

const categoryRoute = Router()

categoryRoute.get('/',getall)