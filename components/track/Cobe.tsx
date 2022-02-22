import React, { useEffect, useRef } from 'react'
/* @ts-ignore */
import createGlobe from 'cobe'

const Cobe = (props: { size: number }) => {
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
      markers: [
        // longitude latitude
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 }
      ],
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
  }, [props.size])
  return (<canvas
    ref={canvasRef}
    style={{
      width: props.size / 2,
      height: props.size / 2,
    }}
  />)
}

export default Cobe