import iconMarker from '../../assets/images/marker-icon.png';
import iconStart from '../../assets/images/marker-icon-start.png';
import iconEnd from '../../assets/images/marker-icon-end.png';
import iconShadow from '../../assets/images/marker-shadow.png';
import L from 'leaflet';

const startIcon = L.icon({
  iconUrl: iconStart,
  iconSize: [19, 31],
  iconAnchor: [10, 31]
});

const endIcon = L.icon({
  iconUrl: iconEnd,
  iconSize: [19, 31],
  iconAnchor: [10, 31]
});

const shadowIcon = L.icon({
  iconUrl: iconShadow,
  iconSize: [19, 31],
  iconAnchor: [10, 31]
});

const markerIcon = L.icon({
  iconUrl: iconMarker,
  iconSize: [19, 31],
  iconAnchor: [10, 31]
});

export { startIcon, endIcon, shadowIcon, markerIcon };