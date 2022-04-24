import React, { useEffect, useRef } from 'react'
import createGlobe, { Marker } from 'cobe'

export interface CobeIProps{
	size:number,
	markers:Marker[]
}

const Cobe = (props:CobeIProps) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	useEffect(() => {
		if (!canvasRef.current) return
		let phi = 0
		const globe = createGlobe(canvasRef.current, {
			devicePixelRatio: 2,
			width: props.size,
			height: props.size,
			phi: 0,
			theta: 0,
			dark: 1,
			diffuse: 1.2,
			mapSamples: 16000,
			mapBrightness: 6,
			baseColor: [0.3, 0.3, 0.3],
			markerColor: [0.1, 0.8, 1],
			glowColor: [1, 1, 1],
			markers: props.markers,
			onRender: (state:any) => {
				state.phi = phi
				phi += 0.007
			},
		})

		return () => {
			globe.destroy()
		}
	}, [props.markers, props.size])
	return (<canvas
		ref={canvasRef}
		style={{
			width: props.size / 2,
			height: props.size / 2,
		}}
	/>)
}

export default Cobe