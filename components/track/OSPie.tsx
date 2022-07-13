import { Pie, PieConfig } from '@ant-design/plots'

const OSPie = () => {
	const data = [
		{ type: 'Android', value: 37 },
		{ type: 'IOS', value: 34 },
		{ type: 'Windows', value: 56 },
		{ type: 'Mac OS', value: 23 },
	]

	const config: PieConfig = {
		appendPadding: 10,
		data,
		angleField: 'value',
		colorField: 'type',
		radius: 0.9
	}



	return (
		<Pie {...config} />
	)
}

export default OSPie