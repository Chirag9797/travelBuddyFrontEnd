import React, { useCallback, useContext, useRef, useState } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api'
import "../../App.css"
import '@reach/combobox/styles.css'
import { format, formatRelative } from 'date-fns';
import { Button, Container, FormGroup, Input, Label } from 'reactstrap';


import Search from '../Search';
import TravelContext from '../../context/TravelContext';
import { useNavigate } from 'react-router-dom';


const Map = () => {

  const navigate = useNavigate();

  const travelContext = useContext(TravelContext);

  const { getTravelList, travelList, addTravelList, addTravelBuddies } = travelContext;

  const libraries = ['places'];
  // const [ libraries ] = useState(['places']);


  const mapContainerStyle = {
    width: "100%",
    height: "100vh"
  }

  const [lat, setLat] = useState(43.653225);
  const [lng, setLng] = useState(-79.383186);

  const [Lname, setLname] = useState(null);
  const [Ltitle, setLtitle] = useState(null);



  const center = {
    lat: 43.653225,
    lng: -79.383186
  }



  const { isLoaded, loadError } = useLoadScript({
    // googleMapsApiKey:process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    googleMapsApiKey: "AIzaSyDQP2qKJny9J57wND3lNzixKTOTpRaXULk",
    libraries
  });

  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);


  const onMapClick = React.useCallback((event) => {
    // console.log(event.latLng.lat(), event.latLng.lng())
    setLat(event.latLng.lat());
    setLng(event.latLng.lng())

    setMarkers((current) => [...current, {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date()
    }])
  }, [])

  const mapRef = useRef();


  const onMapLoad = useCallback((map) => {
    mapRef.current = map;

  }, [])


  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(12)
  }, [])

  if (loadError) return "Error loading maps";

  if (!isLoaded) return "Loading Maps";


  const handleInputName = (e) => {
    console.log(e.target.value)
    setLname(e.target.value)
  }

  const handleInputTitle = (e) => {
    setLtitle(e.target.value)
    console.log(e.target.value)
  }


  const doSomething = (lat, lng) => {
    //name - title
    // title - description
    console.log(lat, lng)
    console.log(Lname, Ltitle);
    const currentD = new Date();
    console.log(currentD.toISOString())


    let data = {
      title: Lname,
      description: Ltitle,
      travelDate: currentD.toISOString(),
      lat: lat,
      lng: lng
    }

    addTravelList(data);
    navigate('/', { replace: true })

  }



  return (
    <Container>


      <Search panTo={panTo} />

      <GoogleMap mapContainerStyle={mapContainerStyle}
        zoom={8}

        center={{ lat: lat, lng: lng }}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map(marker =>
          <Marker key={marker.time.toISOString()} position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: 'https://img.icons8.com/doodle/344/beach--v1.png',
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15)
            }}
            onClick={() => {
              setSelected(marker)
            }}
          />

        )}

        {/* marked by users */}



        <Marker position={{ lat: 23, lng: 90 }} />


        {selected ?
          (<InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => {
            setSelected(null)
          }} >
            <Container>
              <p>Hello, you have selected the location</p>
              <p>Please add details so that other travelers can join you</p>

              <FormGroup>
                <Label> Add Title</Label>
                <Input onChange={handleInputName} value={Lname} type="text" />

              </FormGroup>
              <FormGroup>
                <Label>  Add Description</Label>
                <Input onChange={handleInputTitle} value={Ltitle} type="text" />

              </FormGroup>

              <FormGroup>
                <Button onClick={() => doSomething(selected.lat, selected.lng)} type='submit'> Add market</Button>


              </FormGroup>

              {/* <p>Time - {formatRelative(selected.time, new Date())} </p> */}
            </Container>
          </InfoWindow>) : null}
      </GoogleMap>
    </Container>
  )

}

export default Map;