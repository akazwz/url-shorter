import React, { useEffect } from 'react'
import {
  Box,
} from '@chakra-ui/react'
import { WebGLRenderer, PerspectiveCamera, Scene, LineBasicMaterial, Vector3, BufferGeometry, Line } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const Dashboard = () => {

  useEffect(() => {
    const renderer = new WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    const camera = new PerspectiveCamera(45,
      window.innerWidth / window.innerHeight, 1, 500)
    camera.position.set(0, 0, 100)
    camera.lookAt(0, 0, 0)

    const scene = new Scene()

    const material = new LineBasicMaterial({color: 0x0000ff})

    const points = []
    points.push(new Vector3(-10, 0,0))
    points.push(new Vector3(0, 10,0))
    points.push(new Vector3(10, 0,0))

    const geometry = new BufferGeometry().setFromPoints(points)

    const line = new Line(geometry, material)

    scene.add(line)
    renderer.render(scene, camera)
  }, [])

  return (
    <Box
      /*bg={useColorModeValue('white', 'gray.900')}*/
      bg={'white'}
    >
    </Box>
  )
}

export default Dashboard