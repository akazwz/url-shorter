import { Bar, BarConfig } from '@ant-design/plots'

const BrowserBar = () => {
	const data = [
		{ key: 'Chrome', value: 99 },
		{ key: 'Edge', value: 89 },
		{ key: 'Webkit', value: 77 },
		{ key: 'MIUI browser', value: 65 },
		{ key: 'Firefox', value: 54 },
		{ key: 'Quark', value: 43 },
		{ key: 'Safari', value: 34 },
		{ key: 'QQBrowser', value: 23 },
	]

	const config: BarConfig = {
		data,
		appendPadding: 10,
		xField: 'value',
		yField: 'key',
		yAxis: {
			label: {
				autoRotate: false,
			},
		},
		scrollbar: {
			type: 'vertical',
			style: {
				trackColor: 'lightGray',
				thumbColor: 'gray'
			},
		},
	}

	return (
		<Bar {...config} />
	)
}

export default BrowserBar