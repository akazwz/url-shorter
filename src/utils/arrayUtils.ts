export const uniqueSimpleArr = (array: any[]): any[] => {
  return Array.from(new Set(array))
}