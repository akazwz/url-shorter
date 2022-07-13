export const uniqueSimpleArr = (arr: any[]): any[] => {
	return Array.from(new Set(arr))
}

export const uniqueAndCountArr = (arr: any[]): {} => {
	let obj: any = {}
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] in obj) {
			obj[arr[i]] = obj[arr[i]] + 1
		} else {
			obj[arr[i]] = 1
		}
	}
	return obj
}

export const unique = (arr: any[]): any[] => {
	let arrTempString: string[] = []
	arr.map((item: any) => {
		arrTempString.push(JSON.stringify(item))
	})

	const arrUniqueString = uniqueSimpleArr(arrTempString)
	return arrUniqueString.map((item: any) => (JSON.parse(item)))
}