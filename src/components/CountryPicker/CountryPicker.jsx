import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl, TextField } from "@material-ui/core";
import { fetchCountries } from "../../api";

import styles from "./CountryPicker.module.css";
import Autocomplete from "react-autocomplete";

const CountryPicker = ({ handleCountryChange }) => {
  const [fetchedCountries, setFetechedCountries] = useState([]);
  const [value, setValue] = useState("");
  const [filtredData, setFiltredData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setFetechedCountries(await fetchCountries());
    };

    fetchAPI();
  }, []);

  const onChangeHandler = (e) => {
    const val = e.target.value;
    setValue(val);
    const filtredData = fetchedCountries.filter((country) =>
      country.label.toLowerCase().includes(val)
    );
    setFiltredData(filtredData);
    if (val) handleCountryChange("");
  };

  const onSelectHandler = (v) => {
    setValue(v);
    handleCountryChange(v);
  };

  return (
    <FormControl className={styles.formControl}>
      <Autocomplete
        renderInput={(props) => (
          <TextField
            {...props}
            fullWidth
            id="standard-basic"
            label="Enter Country Name"
          />
        )}
        getItemValue={(item) => item.label}
        items={filtredData}
        renderItem={(item, isHighlighted) => (
          <div
            key={item.label}
            style={{ background: isHighlighted ? "#808080" : "lightgray" }}
          >
            {item.label}
          </div>
        )}
        value={value}
        onChange={onChangeHandler}
        onSelect={onSelectHandler}
      />
    </FormControl>
  );
};

export default CountryPicker;
