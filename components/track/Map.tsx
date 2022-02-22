import { MapContainer, LayersControl, TileLayer, Marker, Popup } from 'react-leaflet'
import { icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon from '../../public/markers/marker.png'
import visitIcon from '../../public/markers/visiter.png'
import userIcon from '../../public/markers/user.png'
import ipIcon from '../../public/markers/ip.png'

const Map = () => {
  const ICON = icon({
    iconUrl: ipIcon.src,
    iconSize: [32, 32],
  })

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
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
      <Marker icon={ICON} position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br/> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}
export default Map