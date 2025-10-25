import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface HeatMapData {
  lat: number;
  lng: number;
  intensity: number;
  category: string;
  details: {
    incidents?: number;
    crowdDensity?: number;
    securityLevel?: number;
    trafficFlow?: number;
    environmental?: number;
  };
}

interface InteractiveHeatMapProps {
  selectedCategory: string;
  onCellHover: (data: HeatMapData | null) => void;
}

// Component to update map view when category changes
const MapUpdater: React.FC<{ selectedCategory: string }> = ({ selectedCategory }) => {
  const map = useMap();
  
  useEffect(() => {
    // Reset view to port city center when category changes
    map.setView([6.933774250378392, 79.83122508116483], 15);
  }, [selectedCategory, map]);
  
  return null;
};

const InteractiveHeatMap: React.FC<InteractiveHeatMapProps> = ({ selectedCategory, onCellHover }) => {
  const [heatMapData, setHeatMapData] = useState<HeatMapData[]>([]);

  // Generate heat map data based on category
  const generateHeatMapData = (category: string): HeatMapData[] => {
    const data: HeatMapData[] = [];
    const centerLat = 6.933774250378392;
    const centerLng = 79.83122508116483;
    const width = 1.5; // km
    const height = 3; // km
    
    // Convert km to degrees (approximate)
    const latRange = height / 111; // 1 degree ≈ 111 km
    const lngRange = width / (111 * Math.cos(centerLat * Math.PI / 180));
    
    // Define city boundaries
    const minLat = centerLat - latRange/2;
    const maxLat = centerLat + latRange/2;
    const minLng = centerLng - lngRange/2;
    const maxLng = centerLng + lngRange/2;
    
    // Generate random seed based on category for consistent but different patterns
    const seed = category.charCodeAt(0) + category.length;
    const seededRandom = (x: number, y: number) => {
      const n = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453;
      return n - Math.floor(n);
    };
    
    // Generate random island centers concentrated around the center
    const generateIslandCenters = (count: number) => {
      const centers = [];
      for (let i = 0; i < count; i++) {
        // Use polar coordinates to concentrate around center
        const angle = seededRandom(i, 0) * 2 * Math.PI;
        const distance = Math.sqrt(seededRandom(i, 1)) * (latRange * 0.3); // Concentrated within 30% of city radius
        
        const lat = centerLat + distance * Math.cos(angle);
        const lng = centerLng + distance * Math.sin(angle);
        
        // Ensure within bounds
        if (lat >= minLat && lat <= maxLat && lng >= minLng && lng <= maxLng) {
          centers.push({
            lat,
            lng,
            radius: 0.003 + seededRandom(i, 2) * 0.008, // Random radius between 0.003 and 0.011
            weight: 0.6 + seededRandom(i, 3) * 0.4 // Random weight between 0.6 and 1.0
          });
        }
      }
      return centers;
    };
    
    // Generate different numbers of islands per category
    const islandCounts = {
      incidents: 6,
      crowd: 8,
      security: 5,
      traffic: 7,
      environmental: 6
    };
    
    const islandCenters = generateIslandCenters(islandCounts[category as keyof typeof islandCounts] || 5);
    
    // Generate random points instead of grid
    const numPoints = 800; // Total number of random points to generate
    for (let i = 0; i < numPoints; i++) {
      // Generate random coordinates within city bounds
      const lat = minLat + seededRandom(i, 4) * (maxLat - minLat);
      const lng = minLng + seededRandom(i, 5) * (maxLng - minLng);
      
      let intensity = 0;
      const details: any = {};
      
      // Calculate intensity based on distance from all island centers
      for (const island of islandCenters) {
        const distance = Math.sqrt(
          Math.pow(lat - island.lat, 2) + 
          Math.pow(lng - island.lng, 2)
        );
        
        if (distance < island.radius) {
          const normalizedDistance = distance / island.radius;
          const islandIntensity = island.weight * (1 - normalizedDistance) * (1 - normalizedDistance);
          intensity = Math.max(intensity, islandIntensity);
        }
      }
      
      // Add some random variation
      const noise = seededRandom(lat * 1000, lng * 1000) * 0.15;
      intensity = Math.min(1, intensity + noise);
      
      // Generate details based on category and intensity
      switch (category) {
        case 'incidents':
          details.incidents = Math.floor(intensity * 15);
          details.severity = intensity > 0.7 ? 'High' : intensity > 0.4 ? 'Medium' : 'Low';
          break;
        case 'crowd':
          details.crowdDensity = Math.floor(intensity * 100);
          details.peopleCount = Math.floor(intensity * 500);
          break;
        case 'security':
          details.securityLevel = Math.floor(intensity * 100);
          details.cameras = Math.floor(intensity * 8);
          break;
        case 'traffic':
          details.trafficFlow = Math.floor(intensity * 100);
          details.vehicles = Math.floor(intensity * 200);
          break;
        case 'environmental':
          details.environmental = Math.floor(intensity * 100);
          details.airQuality = intensity > 0.7 ? 'Poor' : intensity > 0.4 ? 'Moderate' : 'Good';
          break;
      }
      
      // Only add points with significant intensity
      if (intensity > 0.2) {
        data.push({
          lat,
          lng,
          intensity: Math.min(1, Math.max(0, intensity)),
          category,
          details
        });
      }
    }
    
    return data;
  };

  useEffect(() => {
    const data = generateHeatMapData(selectedCategory);
    setHeatMapData(data);
  }, [selectedCategory]);

  const getColor = (intensity: number) => {
    if (intensity < 0.2) return '#10b981'; // green
    if (intensity < 0.4) return '#eab308'; // yellow
    if (intensity < 0.6) return '#f97316'; // orange
    if (intensity < 0.8) return '#ef4444'; // red
    return '#dc2626'; // dark red
  };

  const getRadius = (intensity: number) => {
    return Math.max(8, Math.min(25, intensity * 30));
  };

  const getOpacity = (intensity: number) => {
    return Math.max(0.3, Math.min(1, intensity));
  };

  const categoryLabels = {
    incidents: 'Incidents',
    crowd: 'Crowd Density',
    security: 'Security Coverage',
    traffic: 'Traffic Flow',
    environmental: 'Environmental'
  };

  return (
    <div className="w-full h-full">
      <MapContainer
        center={[6.933774250378392, 79.83122508116483]}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <MapUpdater selectedCategory={selectedCategory} />
        
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {heatMapData.map((point, index) => (
          <CircleMarker
            key={index}
            center={[point.lat, point.lng]}
            radius={getRadius(point.intensity)}
            pathOptions={{
              color: getColor(point.intensity),
              fillColor: getColor(point.intensity),
              fillOpacity: getOpacity(point.intensity),
              weight: 1,
              opacity: 0.8
            }}
            eventHandlers={{
              mouseover: () => onCellHover(point),
              mouseout: () => onCellHover(null)
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg mb-2">
                  {categoryLabels[selectedCategory as keyof typeof categoryLabels]}
                </h3>
                <div className="space-y-1 text-sm">
                  <div>Intensity: {(point.intensity * 100).toFixed(1)}%</div>
                  <div>Coordinates: {point.lat.toFixed(6)}, {point.lng.toFixed(6)}</div>
                  {Object.entries(point.details).map(([key, value]) => (
                    <div key={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                    </div>
                  ))}
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default InteractiveHeatMap;
