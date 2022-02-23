import { Pie, measureTextWidth } from '@ant-design/plots'

const BrowserNamePie = () => {
  function renderStatistic (containerWidth: number, text: string, style: { fontSize: number }) {
    const { width: textWidth, height: textHeight } = measureTextWidth(text, style)
    const R = containerWidth / 2 // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1

    if (containerWidth < textWidth) {
      scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1)
    }

    const textStyleStr = `width:${containerWidth}px;`
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`
  }

  const data = [
    {
      type: 'Chrome',
      value: 27,
    },
    {
      type: 'Edge',
      value: 25,
    },
    {
      type: 'Safari',
      value: 18,
    },
    {
      type: 'Other',
      value: 5,
    },
  ]
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.64,
    meta: {
      value: {
        formatter: (v: any) => `${v} ¥`,
      },
    },
    label: {
      type: 'inner',
      offset: '-50%',
      style: {
        textAlign: 'center',
      },
      autoRotate: false,
      content: '{value}',
    },
    statistic: {
      title: {
        offsetY: -4,
        customHtml: (container: any, view: any, datum: any) => {
          const { width, height } = container.getBoundingClientRect()
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2))
          const text = datum ? datum.type : 'SUM'
          return renderStatistic(d, text, {
            fontSize: 28,
          })
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '32px',
        },
        customHtml: (container: any, view: any, datum: any) => {
          const { width } = container.getBoundingClientRect()
          const text = datum ? `${datum.value}` : `${data.reduce((r, d) => r + d.value, 0)}`
          return renderStatistic(width, text, {
            fontSize: 32,
          })
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

export default BrowserNamePie