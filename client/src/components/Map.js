import React from "react";
import { compose, withStateHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

const MapWithAMarkedInfoWindow = compose(
  withStateHandlers(
    () => ({
      isOpen: false
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen
      })
    }
  ),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat: 35.780728, lng: -78.656185 }}
  >
    <Marker
      position={{ lat: 35.780728, lng: -78.656185 }}
      onClick={props.onToggleOpen}
    >
      {props.isOpen && (
        <InfoWindow onCloseClick={props.onToggleOpen}>
          <p>Goodnights Comedy Club</p>
        </InfoWindow>
      )}
    </Marker>
  </GoogleMap>
));

class MapContainer extends React.Component {
  render() {
    return (
      <MapWithAMarkedInfoWindow
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyADvJGNIqxVR67oT-sRqnAhDSvsUTlb-6A&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

export default MapContainer;
