import { uniqueAndCountArr } from './arrayUtils'

export type PieData = {
  type: string,
  value: number
}

export const generatePieDataFromStringArr = (arr: string[]): PieData[] => {
  const obj = uniqueAndCountArr(arr)
  const typesBrowserName = Object.keys(obj)
  const valuesBrowserName = Object.values(obj) as number[]
  let pieData: PieData[] = []
  for (let i = 0; i < typesBrowserName.length; i++) {
    pieData.push({ type: typesBrowserName[i], value: valuesBrowserName[i] })
  }
  return pieData
}