import React, { useEffect, useRef } from 'react'
/* @ts-ignore */
import createGlobe from 'cobe'
import { LatLngTuple } from 'leaflet'

export interface ICobeprops {
  size: number,
  markers?: {
    location: number[],
    size: number
  }[]
}

const Cobe = (props: ICobeprops) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
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
      markers: props.markers || [{location: [39.9, 116.3], size: 0.05}],
      onRender: (state: any) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
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