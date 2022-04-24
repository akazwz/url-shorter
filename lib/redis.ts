import Redis from 'ioredis'

if (!process.env.REDIS_URL) {
	throw new Error('No Redis Url')
}

const redis = new Redis(process.env.REDIS_URL)

export default redis