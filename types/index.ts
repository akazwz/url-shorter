export interface Link{
	url: string
	short_code: string
	ip?: string
	email?: string
}

export interface Visit{
	linkId: string
	short_code: string
	ip?: string
	country?: string
	city?: string
	latitude?: string
	longitude?: string
	region?: string
	is_bot?: boolean
	ua?: string
	browser_name?: string
	browser_version?: string
	device_model?: string
	device_type?: string
	device_vendor?: string
	engine_name?: string
	engine_version?: string
	os_name?: string
	os_version?: string
	cpu_architecture?: string
}