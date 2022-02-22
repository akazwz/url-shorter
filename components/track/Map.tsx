import { MapContainer, LayersControl, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { icon, LatLngTuple } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon from '../../public/markers/marker.png'
import visitIcon from '../../public/markers/visiter.png'
import userIcon from '../../public/markers/user.png'
import ipIcon from '../../public/markers/ip.png'
import { useEffect } from 'react'

export interface IMapProps {
  markersPoints: LatLngTuple[] | null
}

const FlyToIp = (props: IMapProps) => {
  const { markersPoints } = props
  const map = useMap()
  useEffect(() => {
    let interval: NodeJS.Timer
    let i = 0
    if (!markersPoints) return
    if (markersPoints.length < 1) return
    interval = setInterval(() => {
      i++
      if (i === markersPoints.length - 1) {
        i = 0
      }
      console.log('inter')
      console.log(markersPoints[i])
      map.flyTo(markersPoints[i]).setZoom(10)
    }, 3000)
    return () => {
      clearInterval(interval)
    }
  }, [map, markersPoints])
  return null
}

const Map = (props: IMapProps) => {
  const { markersPoints } = props
  const ICON = icon({
    iconUrl: ipIcon.src,
    iconSize: [32, 32],
  })

  return (
    <MapContainer
      center={[39.9, 116.3]}
      zoom={10}
      style={{
        height: '45vh',
        width: '100%',
        borderRadius: '0.5rem',
      }}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="MapBoxDark">
          <TileLayer
            url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
            id="mapbox/dark-v10"
            accessToken="pk.eyJ1IjoiYWthend6IiwiYSI6ImNreDdvbGpodjM0NTYydXFvZ2JzMnQycDUifQ.OX_1hbGyke9K5ZZobjXRHQ"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="OpenStreetMap.Mapnik">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      {markersPoints ? markersPoints.map((point, index) => {
          return (
            <Marker key={'points' + index} icon={ICON} position={point}>
              <Popup>
                A pretty CSS3 popup. <br/> Easily customizable.
              </Popup>
            </Marker>
          )
        }) :
        null
      }
      <FlyToIp markersPoints={markersPoints}/>
    </MapContainer>
  )
}
export default Map