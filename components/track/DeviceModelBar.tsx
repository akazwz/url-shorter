import { Bar, BarConfig } from '@ant-design/plots'

const DeviceModelBar = () => {
	const data = [
		{ model: 'iPhone 13', count: 89 },
		{ model: 'Huawei Mate 40', count: 78 },
		{ model: 'Xiaomi 12s', count: 56 },
		{ model: 'Oppo Reno 6', count: 45 },
		{ model: 'Redmi k50', count: 40 },
		{ model: 'Redmi k50 Pro', count: 39 },
		{ model: 'Vivo x7', count: 34 },
		{ model: 'Xiaomi 11', count: 34 },
		{ model: 'Huawei P40', count: 34 },
		{ model: 'iPhone 12', count: 34 },
		{ model: 'iPhone 11', count: 34 },
		{ model: 'iPhone x', count: 34 },
		{ model: 'Oppo find x3', count: 34 },
		{ model: 'Oppo find x5', count: 34 },
		{ model: 'Oppo find x5 pro', count: 33 },
		{ model: 'Realme GT 2', count: 20 },
	]

	const config: BarConfig = {
		appendPadding: 10,
		data,
		xField: 'count',
		yField: 'model',
		yAxis: {
			label: {
				autoRotate: false,
			},
		},
		scrollbar: {
			type: 'vertical',
		},
	}

	return (
		<>
			<Bar {...config} />
		</>
	)
}

export default DeviceModelBar