import "./App.css";
import Header from "./components/Header";
import InfoBox from "./components/InfoBox";
// import { FormControl, Select, MenuItem } from "@material-ui/core";
import { useState, useEffect } from "react";
import Map from "./components/Map";
// import Map from "./components/Map";
import { Card} from "@material-ui/core";
import Table from "./components/Table"
import LineGraph from "./components/LineGraph.js"
import { sortData } from "./utils/utils";

function App() {
  const [countries, setCountries] = useState([]);
  const [countriesData, setCountriesData] = useState({});
  const [tableData, setTableData] = useState([])

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
            setTableData(sortData(data))
            setCountries(countries);
          }
        });
    };
    getCountriesData();
    console.log("countriesData parent:", countriesData);
  }, [countriesData]);

  const fetchDataFromChild = (data) => {
    setCountriesData(data);
  };

  return (
    // BEN naming convernsion
    <div className="app">
      <Header countries={countries} fetchDataFromChild={fetchDataFromChild} />

      <div className="app__container">
        <div className="app__left">
          {/* infoBoxes */}
          <div className="app__stats">
            <InfoBox
              title="Active cases"
              cases={countriesData?.active}
              total={countriesData?.cases}
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

          <Card>
            <LineGraph />
          </Card>
        </div>

        <Card className="app__center">
          <Map />
        </Card>

        <Card className="app__right">
          {/* graph */}
          {/* map */}
          <h3>Live cases by country</h3>
          <Table tableData={tableData}/>
        </Card>
      </div>
    </div>
  );
}

export default App;
