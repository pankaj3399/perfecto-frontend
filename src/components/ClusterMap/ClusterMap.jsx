import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, useLoadScript, InfoWindow } from "@react-google-maps/api";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { debounce } from "lodash";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};

export default function ClusterMap({ latitude, longitude, properties, onBoundsChanged }) {
  const [mapCenter, setMapCenter] = useState({
    lat: parseFloat(latitude) || 42.361145,
    lng: parseFloat(longitude) || -71.057083,
  });
  const [selectedProperty, setSelectedProperty] = useState(null);
  const mapRef = useRef(null);
  const markerClustererRef = useRef(null);
  const markersRef = useRef([]);
  const prevPropertiesRef = useRef([]);

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

  const updateMarkers = () => {
    if (mapRef.current && isLoaded) {
      // Clear previous markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      // Create new markers
      const newMarkers = properties.map(point => {
        const marker = new window.google.maps.Marker({
          position: {
            lat: parseFloat(point.latitude),
            lng: parseFloat(point.longitude),
          }
        });

        marker.addListener("click", () => handleMarkerClick(point));
        return marker;
      });

      markersRef.current = newMarkers;

      if (markerClustererRef.current) {
        markerClustererRef.current.clearMarkers();
        markerClustererRef.current.addMarkers(markersRef.current);
      } else {
        markerClustererRef.current = new MarkerClusterer({ markers: markersRef.current, map: mapRef.current });
      }
    }
  };

  useEffect(() => {
    if (JSON.stringify(prevPropertiesRef.current) !== JSON.stringify(properties)) {
      updateMarkers();
      prevPropertiesRef.current = properties; // Update the cached properties
    }
  }, [isLoaded, properties]);

  const navigate = useNavigate();

  const handleMarkerClick = (property) => {
    setSelectedProperty(property);
  };

  const handleNavigate = (propertyID) => {
    navigate(`/property-details/${propertyID}`);
  };

  // Debounced version of handleBoundsChanged
  const debouncedHandleBoundsChanged = useCallback(debounce(() => {
    if (mapRef.current) {
      const bounds = mapRef.current.getBounds();
      if (bounds && onBoundsChanged) {
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
        onBoundsChanged({
          minLat: sw.lat(),
          maxLat: ne.lat(),
          minLng: sw.lng(),
          maxLng: ne.lng(),
        });
      }
    }
  }, 300), [onBoundsChanged]);

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
        onZoomChanged={debouncedHandleBoundsChanged}
        onBoundsChanged={debouncedHandleBoundsChanged}
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
