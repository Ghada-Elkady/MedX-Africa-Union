import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const COLOR = {
    Critical: "#ef4444",
    High: "#f97316",
    Medium: "#f59e0b",
    Warning: "#eab308",
    Low: "#22c55e"
};

const RescueMap = ({ sites }) => (
    <div className="relative z-0 rounded-2xl overflow-hidden border border-slate-200">
        <MapContainer center={[30.0444, 31.2357]} zoom={10} scrollWheelZoom={false} className="h-96 w-full">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {sites
                .filter((site) => site.lat && site.lng)
                .map((site) => (
                    <CircleMarker
                        key={site.id}
                        center={[site.lat, site.lng]}
                        radius={site.isWatchSos ? 15 : 10}
                        pathOptions={{
                            color: COLOR[site.severity] || COLOR.Low,
                            fillColor: COLOR[site.severity] || COLOR.Low,
                            fillOpacity: site.isWatchSos ? 0.85 : 0.55,
                            weight: 2
                        }}
                    >
                        <Tooltip>{site.place}</Tooltip>
                        <Popup>
                            <div className="text-xs leading-snug">
                                <p className="font-bold text-slate-900">{site.place}</p>
                                <p className="text-slate-600">{site.location}</p>
                                <p className="text-slate-500">{site.type} · {site.severity}</p>
                                <p className="text-slate-500">Status: {site.status}</p>
                                {site.affected > 1 && <p className="text-slate-500">Affected: {site.affected}</p>}
                                {site.isWatchSos && <p className="text-red-600 font-bold">📡 Watch SOS</p>}
                            </div>
                        </Popup>
                    </CircleMarker>
                ))}
        </MapContainer>
    </div>
);

export default RescueMap;