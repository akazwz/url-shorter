export const uniqueSimpleArr = (arr: []): any[] => {
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