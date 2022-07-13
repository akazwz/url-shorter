import { Bar, BarConfig } from '@ant-design/plots'

const DeviceModelBar = ({data}:{data: any[]}) => {
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
		maxBarWidth: 20,
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