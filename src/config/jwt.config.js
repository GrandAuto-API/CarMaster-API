import config from 'dotenv'

config()

export const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET