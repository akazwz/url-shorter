import { Column, ColumnConfig } from '@ant-design/plots'

const DeviceVendorColumn = () => {
	const data = [
		{ key: 'Apple', value: 90 },
		{ key: 'Xiaomi', value: 87 },
		{ key: 'Samsung', value: 80 },
		{ key: 'OPPO', value: 78 },
		{ key: 'Vivo', value: 67 },
		{ key: 'Meizu', value: 66 },
		{ key: 'LG', value: 31 },
		{ key: 'Realme', value: 23 },
	]

	const config: ColumnConfig = {
		appendPadding: 10,
		data,
		xField: 'key',
		yField: 'value',
		xAxis: {
			label: {
				autoRotate: false,
			},
		},
		scrollbar: {
			type: 'horizontal',
			style: {
				trackColor: 'lightGray',
				thumbColor: 'gray'
			},
		},
	}

	return (
		<Column {...config} />
	)
}

export default DeviceVendorColumn