import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix leaflet default icon issue (when using markers)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'leaflet/dist/images/marker-icon-2x.png',
  iconUrl: 'leaflet/dist/images/marker-icon.png',
  shadowUrl: 'leaflet/dist/images/marker-shadow.png',
});

// Create custom icons for different vehicle types
const carIcon = new L.Icon({
  iconUrl: '/car.png', // Ensure this image is in the public directory
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const motorcycleIcon = new L.Icon({
  iconUrl: '/motorcycle.png', // Ensure this image is in the public directory
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export default function Map({ vehicles }) {
  return (
    <MapContainer
      center={vehicles.length > 0 && vehicles[0].positions.length > 0 ? vehicles[0].positions[vehicles[0].positions.length - 1] : [51.505, -0.09]}
      zoom={18}
      className="h-96"
      style={{ height: '600px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {vehicles.map(vehicle => (
        <div key={vehicle.id}>
          <Polyline positions={vehicle.positions} color="blue" />
          {vehicle.positions.length > 0 && (
            <Marker
              position={vehicle.positions[vehicle.positions.length - 1]}
              icon={vehicle.jenis_kendaraan === 'MOBIL' ? carIcon : motorcycleIcon} // Conditional icon
            >
              <Popup>
                {vehicle.name} - Last Position
              </Popup>
            </Marker>
          )}
        </div>
      ))}
    </MapContainer>
  );
}