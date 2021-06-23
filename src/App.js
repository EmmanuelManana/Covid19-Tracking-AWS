import "./App.css";
import Header from "./components/Header";
import InfoBox from "./components/InfoBox";
// import { FormControl, Select, MenuItem } from "@material-ui/core";
import { useState, useEffect } from "react";
import Map from "./components/Map";
// import Map from "./components/Map";
import { Card } from "@material-ui/core";
import Table from "./components/Table";
import LineGraph from "./components/LineGraph.js";
import { sortData } from "./utils/utils";
import "leaflet/dist/leaflet.css";
import { useStateValue } from "./components/context/StateProvider";
import Amplify from "aws-amplify"
import config from './aws-exports'
import {withAuthenticator, AmplifySignOut} from "@aws-amplify/ui-react"

Amplify.configure(config)

function App() {
  const [countries, setCountries] = useState([]);
  const [{ countriesData, mapCenter, mapZoom }, dispatch] = useStateValue();
  const [tableData, setTableData] = useState([]);
  const [_countriesData, setCountriesData] = useState({});
  const [_mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    setCountriesData(countriesData);
    
    setMapCenter([mapCenter]);
    if (Object.keys(_countriesData).length) {
      // console.log("data found: ", _countriesData);
      // console.log("and mapCenter is: ", mapCenter);
      
    }
  }, [countriesData, mapCenter]);

  useEffect(() => {
    // https://disease.sh/v3/covid-19/countries
    // async -> send a request, wait for it, do something with the results.

    const getCountriesData = async () => {
      // must create my own api
      await fetch(" https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            code: country.countryInfo.iso3,
          }));

          if (countries) {
            setTableData(sortData(data));
            setCountries(countries);
          }
        });
    };
  
    getCountriesData();
  }, [countriesData, mapCenter]);

  if (_countriesData.length > 0) {
    console.log("length ==>", _countriesData.length);
  }

  // console.log("countries data in app:", Object.keys(_countriesData).length);

  if ((Object.keys(_countriesData).length = 0)) {
    return <h1>Loading</h1>;
  } else {
    return (
      // BEN naming convernsion
      <div className="app">
        <Header countries={countries} />
        <AmplifySignOut />
        <div className="app__container">
          
          <div className="app__left">
            {/* infoBoxes */}
            <div className="app__stats">
              <InfoBox
                title="Active cases"
                cases={_countriesData?.active}
                total={_countriesData?.cases}
              />
              <InfoBox
                title="Recovered"
                cases={countriesData?.todayRecovered}
                total={countriesData?.recovered}
              />
              <InfoBox
                title="Deaths"
                cases={countriesData?.todayDeaths}
                total={countriesData?.deaths}
              />
            </div>

            <Card style={{ height: "400px" }}>
              <LineGraph casesType={"cases"} />
            </Card>
          </div>

          <Card className="app__center">
            <Map
              countries={[countriesData]}
            />
          </Card>

          <Card className="app__right">
            {/* graph */}
            {/* map */}
            <h3>Cases by country</h3>
            <Table tableData={tableData} />
            
          </Card>
          
        </div>
      </div>
    );
  }
}

export default withAuthenticator(App);
