import React from "react";
import { Cards, Chart, CountryPicker, HeaderImage } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import { Container } from "@material-ui/core";

class App extends React.Component {
  state = {
    data: {},
    country: "",
    worldData: {},
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData, worldData: fetchedData });
    console.log(fetchedData);
  }

  handleCountryChange = async (country) => {
    if (country) {
      const fetchedData = await fetchData(country);
      this.setState({ data: fetchedData, country });
    } else {
      this.setState({ data: this.state.worldData, country: "" });
    }
  };

  render() {
    const { data, country } = this.state;
    return (
      <Container>
        <HeaderImage />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Cards data={data} />
        <Chart data={data} country={country} />
      </Container>
    );
  }
}

export default App;
