import { Pie, PieConfig } from '@ant-design/plots'

const OSPie = ({data}:{data: any[]}) => {
	const config: PieConfig = {
		appendPadding: 10,
		data,
		angleField: 'value',
		colorField: 'key',
		radius: 0.9
	}



	return (
		<Pie {...config} />
	)
}

export default OSPie