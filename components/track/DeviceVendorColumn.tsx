import { Column, ColumnConfig } from '@ant-design/plots'

const DeviceVendorColumn = ({data}:{data: any[]}) => {
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
		maxColumnWidth: 20,
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