import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useApp } from '../context/AppContext';
import { branches as staticBranches } from '../data/branches';
import { branchesAPI } from '../api';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import './BranchMap.css';

// Fix default marker icon
const defaultIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const mainIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Component to fix map size after render
function MapResizer() {
    const map = useMap();

    useEffect(() => {
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }, [map]);

    return null;
}

function BranchMap({ selectedBranch, onBranchSelect }) {
    const { language } = useApp();
    const [branches, setBranches] = useState(staticBranches);

    useEffect(() => {
        branchesAPI.getAll()
            .then(data => { if (data.length) setBranches(data); })
            .catch(() => { });
    }, []);

    // Center of Kazakhstan - adjusted for better view
    const kazakhstanCenter = [48.5, 67.0];

    return (
        <div className="branch-map-container">
            <MapContainer
                center={kazakhstanCenter}
                zoom={4}
                scrollWheelZoom={true}
                className="branch-map"
                style={{ height: '450px', width: '100%' }}
            >
                <MapResizer />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {branches.map((branch) => (
                    <Marker
                        key={branch.id}
                        position={branch.coords}
                        icon={branch.isMain ? mainIcon : defaultIcon}
                        eventHandlers={{
                            click: () => onBranchSelect?.(branch)
                        }}
                    >
                        <Popup>
                            <div className="map-popup">
                                <h4>{branch.name[language]}</h4>
                                <p className="popup-address">
                                    <span className="material-icons">location_on</span>
                                    {branch.address[language]}
                                </p>
                                <p className="popup-phone">
                                    <span className="material-icons">phone</span>
                                    {branch.phone}
                                </p>
                                <p className="popup-email">
                                    <span className="material-icons">email</span>
                                    {branch.email}
                                </p>
                                {branch.isMain && (
                                    <span className="popup-badge">
                                        {language === 'kz' ? 'Бас кеңсе' :
                                            language === 'ru' ? 'Главный офис' : 'Head Office'}
                                    </span>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default BranchMap;

