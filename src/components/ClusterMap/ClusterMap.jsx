import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { IoHome } from "react-icons/io5";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Intro({ latitude, longitude, properties }) {
  const [mapCenter, setMapCenter] = useState({
    lat: parseFloat(latitude) || 42.361145,
    lng: parseFloat(longitude) || -71.057083,
  });
  const [selectedProperty, setSelectedProperty] = useState(null);
  const mapRef = useRef(null);
  const markerClustererRef = useRef(null);
  const markersRef = useRef([]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const handleCenterChanged = () => {
    if (mapRef.current) {
      const newCenter = mapRef.current.getCenter();
      setMapCenter({
        lat: newCenter.lat(),
        lng: newCenter.lng(),
      });
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      setMapCenter({
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
      });
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      // Clear previous markers
      if (markerClustererRef.current) {
        markerClustererRef.current.clearMarkers();
      }
      
      markersRef.current = properties.map((point) => {
        const marker = new window.google.maps.Marker({
          position: {
            lat: parseFloat(point.latitude),
            lng: parseFloat(point.longitude),
          },
          icon: {
            url: IoHome,
            scaledSize: new window.google.maps.Size(24, 24),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(12, 12),
          },
        });

        marker.addListener("click", () => handleMarkerClick(point));
        return marker;
      });

      markerClustererRef.current = new MarkerClusterer({ markers: markersRef.current, map: mapRef.current });
    }
  }, [isLoaded, properties]);

  const navigate = useNavigate();

  const handleMarkerClick = (property) => {
    setSelectedProperty(property);
  };

  const handleNavigate = (propertyID) => {
    navigate(`/property-details/${propertyID}`);
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div className="sm:h-[100vh] h-[65vh] w-[100%]">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={10}
        options={defaultOptions}
        onLoad={(map) => {
          mapRef.current = map;
        }}
        onDragEnd={handleCenterChanged}
      >
        {selectedProperty && (
          <InfoWindow
            position={{
              lat: parseFloat(selectedProperty.latitude),
              lng: parseFloat(selectedProperty.longitude),
            }}
            onCloseClick={() => setSelectedProperty(null)}
          >
            <div
              className="bg-white text-[#800080] p-6 rounded-md shadow-md text-center text-sm font-bold flex flex-col items-start cursor-pointer"
              onClick={() => handleNavigate(selectedProperty._id)}
            >
              <div>
                {selectedProperty.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </div>
              <div>{selectedProperty.name}</div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
