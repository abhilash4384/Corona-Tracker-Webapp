import React from "react";
import { Cards, Chart, CountryPicker, HeaderImage } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";

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
      <div className={styles.container}>
        <HeaderImage />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Cards data={data} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
