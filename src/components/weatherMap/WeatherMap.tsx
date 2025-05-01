// components/WeatherMap.tsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

interface Props {
  lat: number;
  lon: number;
  city: string;
}

const WeatherMap = ({ lat, lon, city }: Props) => {
  return (
    <div className="h-[400px] lg:w-[800px] w-[350px] my-5 z-0">
      <MapContainer center={[lat, lon]} zoom={10} scrollWheelZoom={false} className="h-full w-full rounded-md shadow-md">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[lat, lon]}>
          <Popup>{city}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default WeatherMap;
