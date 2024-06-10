import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  APIProvider,
  Map,
  useMap,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { IoHome } from "react-icons/io5";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_MAP_ID = process.env.REACT_APP_GOOGLE_MAPS_MAP_ID

export default function Intro({latitude, longitude, properties}) {
  const [mapCenter, setMapCenter] = useState({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
  useEffect(() => {
    setMapCenter({ lat: parseFloat(latitude) || 42.361145, lng: parseFloat(longitude) || -71.057083});
  }, [latitude, longitude]);

  return (
    <div className="sm:h-[100vh] h-[65vh] w-[100%]">
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <Map
          center={mapCenter}
          zoom={10}
          mapId={GOOGLE_MAPS_MAP_ID}
        >
          <Markers points={properties} />
        </Map>
      </APIProvider>
    </div>
  );
}

const Markers = ({ points }) => {
  const map = useMap();
  const [markers, setMarkers] = useState({});
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const clusterer = useRef(null);
  const history = useNavigate();

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = useCallback((marker, key) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  },[markers]);

  const handleMarkerClick = (id) => {
    setSelectedMarkerId(id === selectedMarkerId ? null : id);
  };

  const handleNavigate = (propertyID) => {
    history(`/property-details/${propertyID}`);
  };

  return (
    <>
      {points.map((point) => {
        // console.log(point);
        return (
          <React.Fragment key={point?._id}>
          <AdvancedMarker
            position={{
              lat: parseFloat(point?.latitude),
              lng: parseFloat(point?.longitude),
            }}
            ref={(marker) => setMarkerRef(marker, (point?._id))}
            onClick={() => handleMarkerClick((point?._id))}
          >
            {selectedMarkerId === parseFloat(point?._id) && (
              <div className="">
                <div
                  className="bg-white text-[#800080] p-6 rounded-md shadow-md text-center text-sm font-bold mt-4 flex flex-col items-start cursor-pointer"
                  onClick={() => handleNavigate((point?._id))}
                >
                  <div>
                    {point.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </div>
                  <div>{point?.name}</div>
                </div>
              </div>
            )}
            <IoHome style={{ fontSize: "24px", color: "#800080" }} />
          </AdvancedMarker>
        </React.Fragment>
        )
      })}
    </>
  );
};
