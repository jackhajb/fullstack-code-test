import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import satellite from './satellite-solid-20.png';

/*******Normally in env file *************/
const accessToken = 'pk.eyJ1IjoiamFja2hhamIiLCJhIjoiY2sxcGlsa2ZxMGFnbTNpbXUzOXJ5ZzRzcyJ9.pl6KQ5ycfAFNrGUJ90CzYQ';

const Map = () => {
  /*********** Instantiate State ************/
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [longitude, latitude] = coordinates;
  const [issPassPoint, setIssPassPoint] = useState(null);
  const [viewport, setViewport] = useState({
    latitude,
    longitude,
    height: '100%',
    width: 'calc(100% - 200px)',
    zoom: 1.5,
  });

  /*********** Fetch Data ************/
  const fetchIssCurrentLocation = () => {
    fetch('http://localhost:8080/api/v1/iss')
      .then(res => res.json())
      .then((res) => {
        if (res.error) throw Error(res.error);
        const { longitude, latitude } = res.data;
        setCoordinates([parseFloat(longitude), parseFloat(latitude)]);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const fetchPassTimes = ([lon, lat]) => {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    fetch(`${proxyurl}http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}&n=1`)
      .then(res => res.json())
      .then((res) => {
        if (res.message !== 'success' && res.reason !== "Longitue must be number between -180.0 and 180.0") throw Error(res.reason);
        const issPassDetails = (res.reason === "Longitue must be number between -180.0 and 180.0" || res.response.length === 0) ? 'The Iss will not pass this point' : new Date(res.response[0].risetime * 1000).toString();
        setIssPassPoint({
          latitude: lat,
          longitude: lon,
          issPassDetails,
        });
      })
      .catch(error => console.error(error));
  };

  /*********** Component Lifecycle ************/
  useEffect(() => {
    setInterval(fetchIssCurrentLocation, 5000);
  }, []);

  /*********** Render ************/
  return (
    <div className='mapbox-full-container'>
      <div className="mapbox-label-container">
        <div className='mapbox-label-strong'>{`Iss Location:`}</div>
        <div className='mapbox-label'>{`Longitude: ${longitude.toFixed(2)}`}</div>
        <div className='mapbox-label'>{`Latitude: ${latitude.toFixed(2)}`}</div>
        <div className='mapbox-label-strong'>{`Viewport Location:`}</div>
        <div className='mapbox-label'>{`Longitude: ${viewport.longitude.toFixed(2)}`}</div>
        <div className='mapbox-label'>{`Latitude: ${viewport.latitude.toFixed(2)}`}</div>
      </div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={accessToken}
        mapStyle='mapbox://styles/jackhajb/ck1tet5gb6ect1cow9o3pcxqg'
        onClick={({ lngLat }) => {
          fetchPassTimes(lngLat);
        }}
        onViewportChange={newViewport => setViewport({ ...newViewport, width: '100%', height: '100%' })}
      >
        <Marker
          key='iss'
          latitude={latitude}
          longitude={longitude}
        >
          <img src={satellite} alt='Satellite Pointer' />
        </Marker>
        {issPassPoint && (
          <Popup
            latitude={issPassPoint.latitude}
            longitude={issPassPoint.longitude}
            onClose={() => setIssPassPoint(null)}
          >
            {issPassPoint.issPassDetails}
          </Popup>
        )}
      </ReactMapGL>
    </div >
  );
};
export default Map;
