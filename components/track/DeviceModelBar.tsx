import { Bar, BarConfig } from '@ant-design/plots'

const DeviceModelBar = () => {
	const data = [
		{ key: 'iPhone 13', value: 89 },
		{ key: 'Huawei Mate 40', value: 78 },
		{ key: 'Xiaomi 12s', value: 56 },
		{ key: 'Oppo Reno 6', value: 45 },
		{ key: 'Redmi k50', value: 40 },
		{ key: 'Redmi k50 Pro', value: 39 },
		{ key: 'Vivo x7', value: 34 },
		{ key: 'Xiaomi 11', value: 34 },
		{ key: 'Huawei P40', value: 34 },
		{ key: 'iPhone 12', value: 34 },
		{ key: 'iPhone 11', value: 34 },
		{ key: 'iPhone x', value: 34 },
		{ key: 'Oppo find x3', value: 34 },
		{ key: 'Oppo find x5', value: 34 },
		{ key: 'Oppo find x5 pro', value: 33 },
		{ key: 'Realme GT 2', value: 20 },
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
		<>
			<Bar {...config} />
		</>
	)
}

export default DeviceModelBar