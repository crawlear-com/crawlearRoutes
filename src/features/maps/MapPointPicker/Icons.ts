import 'leaflet-gpx'
import * as L from 'leaflet'
import markerIcon from '../assets/images/marker-icon.png'
import markerShadow from '../assets/images/marker-shadow.png'

export const iconMark = L.icon({
  iconUrl: markerIcon,
  iconSize: [19, 31],
  iconAnchor: [9, 0]
})

export const iconRoute = L.icon({
  iconUrl: markerIcon,
  iconSize: [19, 31],
  iconAnchor: [10, 0],
  shadowUrl: markerShadow,
  shadowSize: [31, 31]
})

export const circleMarkerAttribs = {
  color: '#444',
  fillColor: '#447',
  fillOpacity: 0.2,
  radius: 25000
}