import { Pie, measureTextWidth } from '@ant-design/plots'
import { PieData } from '../../src/utils/chart'

interface IProps {
  title: string
  pieData: PieData[]
}

const CommonPie = (props: IProps) => {
  function renderStatistic (containerWidth: number, text: string, style: { fontSize: string }) {
    const { width: textWidth, height: textHeight } = measureTextWidth(text, style)
    const R = containerWidth / 2 // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1

    if (containerWidth < textWidth) {
      scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1)
    }

    const textStyleStr = `width:${containerWidth}px;`
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`
  }

  const data = props.pieData
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.64,
    meta: {
      value: {
        formatter: (v: any) => `${v}`,
      },
    },
    label: {
      type: 'inner',
      offset: '-50%',
      style: { textAlign: 'center', overflow: 'hidden' },
      autoRotate: false,
      content: '{value}',
      autoHide: true,
    },
    statistic: {
      title: {
        offsetY: -7,
        customHtml: (container: any, view: any, datum: any) => {
          const { width, height } = container.getBoundingClientRect()
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2))
          const text = datum ? datum.type : props.title
          return `<text style="font-size: small; line-height: initial">${text}</text>`
        },
      },
      content: {
        offsetY: 7,
        customHtml: (container: any, view: any, datum: any) => {
          const { width } = container.getBoundingClientRect()
          const text = datum ? `${datum.value}` : `${data.reduce((r, d) => r + d.value, 0)}`
          return `<text style="font-size: 24px; line-height: initial">${text}</text>`
        },
      },
    },
    // 添加 中心统计文本 交互
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
  }
  return <Pie {...config} />
}

export default CommonPie