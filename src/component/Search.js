import React from 'react';

import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox'

const Search = ({panTo})=>{
    const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
        requestOptions: {
          location: { lat: () => 43.653225, lng: () => -79.383186 },
          radius: 200 * 1000
        }
      })
    
      return (
        <div className='search'>
    
          <Combobox 
          onSelect={async(address) => {
            setValue(address,false);
            clearSuggestions();
            try {
              const result = await getGeocode({address});
              const {lat,lng} = await getLatLng(result[0])
              panTo({lat,lng})
              console.log(lat,lng)
            } catch (error) {
              console.log(error)
            }
            console.log(address);
    
          }}>
            <ComboboxInput value={value} onChange={(e) => {
              setValue(e.target.value)
            }}
              disabled={!ready}
              placeholder="Enter an address"
            />
            <ComboboxPopover>
              {status === "OK" &&
               data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
            </ComboboxPopover>
          </Combobox>
    
        </div>
      )
}


export default Search;