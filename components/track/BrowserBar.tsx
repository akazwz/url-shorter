import { Bar, BarConfig } from '@ant-design/plots'

const BrowserBar = () => {
	const data = [
		{ browser: 'Chrome', count: 99 },
		{ browser: 'Edge', count: 89 },
		{ browser: 'Webkit', count: 77 },
		{ browser: 'MIUI browser', count: 65 },
		{ browser: 'Firefox', count: 54 },
		{ browser: 'Quark', count: 43 },
		{ browser: 'Safari', count: 34 },
		{ browser: 'QQBrowser', count: 23 },
	]

	const config: BarConfig = {
		data,
		appendPadding: 10,
		xField: 'count',
		yField: 'browser',
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