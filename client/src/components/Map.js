import React from "react";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import axios from "axios";

class VenueMarker extends React.Component {
  constructor() {
    super();
    this.state = { isOpen: false };
  }

  onToggleOpen() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    console.log(this.state);
    const { venue } = this.props;
    return (
      <Marker
        position={{
          lat: venue.location.coordinates[0],
          lng: venue.location.coordinates[1]
        }}
        onClick={this.onToggleOpen.bind(this)}
      >
        {this.state.isOpen && (
          <InfoWindow onCloseClick={this.onToggleOpen.bind(this)}>
            <div>
              <p>{venue.name}</p>
              <p>{venue.location.address}</p>
            </div>
          </InfoWindow>
        )}
      </Marker>
    );
  }
}

const MapWithMarkedInfoWindows = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyADvJGNIqxVR67oT-sRqnAhDSvsUTlb-6A&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentWillMount() {
      this.setState({ markers: [] });
    },

    componentDidMount() {
      axios.get("/api/venues").then(res => {
        this.setState({ markers: res.data });
      });
    }
  })
)(props => (
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat: 35.780728, lng: -78.656185 }}
  >
    {props.markers.map(marker => {
      return <VenueMarker venue={marker} key={marker._id} />;
    })}
  </GoogleMap>
));

class MapContainer extends React.Component {
  render() {
    return <MapWithMarkedInfoWindows />;
  }
}

export default MapContainer;
