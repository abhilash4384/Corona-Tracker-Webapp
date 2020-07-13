import React from "react";
import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import coronaImg from "./images/image.png";

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
        <img className={styles.image} alt="COVID-19" src={coronaImg} />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
