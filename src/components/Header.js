import React, { useState, useEffect } from "react";
// import MapContainer as MapLeaflet
import { FormControl, Select, MenuItem } from "@material-ui/core";
import "../styles/Header.css";

const Header = ({ countries, fetchDataFromChild }) => {
  const [country, setCountry] = useState("Worldwide");
  const [countriesData, setCountriesData] = useState({});

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountriesData(data);
      });
  }, []);

  useEffect(() => {
    updateParent();
  }, [countriesData]);

  const onCountryChange = async (event) => {
    let countryCode = event.target.value;

    console.log("country code: ", countryCode);

    //must create my own api
    const url =
      countryCode === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log("type of data: ", typeof data);
        setCountry(countryCode);
        setCountriesData(data);
      });
  };

  const updateParent = () => {
    fetchDataFromChild(countriesData);
  };

  return (
    // {/* Title + select input dropdown field */}
    <div className="header">
      <FormControl className="app__dropdown">
        <Select variant="outlined" value={country} onChange={onCountryChange}>
          <MenuItem value="Worldwide" key="Worldwide">
            Worldwide
          </MenuItem>
          {countries &&
            countries.map((country, i) => (
              <MenuItem value={country.code} key={country.code + i}>
                {country.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <h1>Covid-19 Tracker</h1>
    </div>
  );
};

export default Header;
