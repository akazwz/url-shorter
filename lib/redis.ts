import { Redis } from '@upstash/redis'
import { nanoid } from 'nanoid'

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL || '',
	token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

export const setUrl = async(url: string): Promise<string | null> => {
	try {
		const shortCode = await generateShortCode()
		await redis.set(`short/${shortCode}`, url)
		return shortCode
	} catch (e) {
		return null
	}
}

export const getUrl = async(shortCode: string): Promise<string | null> => {
	const url = await redis.get(`short/${shortCode}`)
	if (typeof url === 'string') {
		return url
	}
	return null
}

export const deleteUrl = async(shortCode: string): Promise<boolean> => {
	try {
		await redis.del(`short/${shortCode}`)
		return true
	} catch (e) {
		return false
	}
}

// generate short code
const generateShortCode = async(): Promise<string> => {
	const shortCode = nanoid(7)
	const url = await getUrl(shortCode)
	if (url) {
		await generateShortCode()
	}
	return shortCode
}