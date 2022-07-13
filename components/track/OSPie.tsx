import { Pie, PieConfig } from '@ant-design/plots'

const OSPie = () => {
	const data = [
		{ key: 'Android', value: 37 },
		{ key: 'IOS', value: 34 },
		{ key: 'Windows', value: 56 },
		{ key: 'Mac OS', value: 23 },
	]

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