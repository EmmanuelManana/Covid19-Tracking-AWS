import React, { useState, useEffect } from "react";
// import MapContainer as MapLeaflet
import { FormControl, Select, MenuItem } from "@material-ui/core";
import "../styles/Header.css";
import { useStateValue } from "./context/StateProvider";

const Header = ({ countries, fetchDataFromChild }) => {
  const [country, setCountry] = useState("Worldwide");
  // const [countriesData, setCountriesData] = useState({});
  const [{ mapCenter, countriesData }, dispatch] = useStateValue();

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "COUNTRIES_DATA",
          payload: data,
        });
      });
  }, [dispatch]);

  useEffect(() => {}, [countriesData]);

  const onCountryChange = (event) => {
    let countryCode = event.target.value;

    console.log("country code: ", countryCode);

    //must create my own api
    const url =
      countryCode === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);

        // console.log("dispatching new country data:", data);
        dispatch({
          type: "COUNTRIES_DATA",
          payload: data,
        });

        dispatch({
          type: "MAP_CENTER",
          payload: { lat: data.countryInfo.lat, lng: data.countryInfo.long },
        });

        dispatch({
          type: "MAP_ZOOM",
          payload: 5,
        });
      });
  };

  // console.log("countries: ", countries)

  return (
    // {/* Title + select input dropdown field */}
    <div className="header">
      <FormControl className="app__dropdown">
        <Select variant="outlined" value={country} onChange={onCountryChange}>
          <MenuItem value="Worldwide" key="Worldwide">
            Globaly
          </MenuItem>
          {countries &&
            countries.map((country, i) => (
              <MenuItem value={country.code} key={country.code + i}>
                {country.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <h1>Covid-19 updates</h1>
    </div>
  );
};

export default Header;
