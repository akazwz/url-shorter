import { Column, ColumnConfig } from '@ant-design/plots'

const DeviceVendorColumn = () => {
	const data = [
		{ vendor: 'Apple', count: 90 },
		{ vendor: 'Xiaomi', count: 87 },
		{ vendor: 'Samsung', count: 80 },
		{ vendor: 'OPPO', count: 78 },
		{ vendor: 'Vivo', count: 67 },
		{ vendor: 'Meizu', count: 66 },
		{ vendor: 'LG', count: 31 },
		{ vendor: 'Realme', count: 23 },
	]

	const config: ColumnConfig = {
		appendPadding: 10,
		data,
		xField: 'vendor',
		yField: 'count',
		xAxis: {
			label: {
				autoRotate: false,
			},
		},
		scrollbar: {
			type: 'horizontal',
		},
	}

	return (
		<Column {...config} />
	)
}

export default DeviceVendorColumn