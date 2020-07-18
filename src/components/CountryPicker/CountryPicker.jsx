import React, { useState, useEffect } from "react";
import { TextField, Box } from "@material-ui/core";
import { fetchCountries } from "../../api";

// import styles from "./CountryPicker.module.css";
import Autocomplete from "react-autocomplete";

const CountryPicker = ({ handleCountryChange }) => {
  const [fetchedCountries, setFetechedCountries] = useState([]);
  const [value, setValue] = useState("");
  const [shouldOpen, setShouldOpen] = useState(true);
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
    setShouldOpen(true);

    const filtredData = fetchedCountries.filter((country) =>
      country.label.toLowerCase().includes(val)
    );
    setFiltredData(filtredData);
    if (val) handleCountryChange("");
  };

  const onSelectHandler = (v) => {
    setValue(v);
    setShouldOpen(false);
    handleCountryChange(v);
  };

  return (
    <Box display="flex" justifyContent="center" m={1} p={1}>
      <Autocomplete
        open={value != "" && shouldOpen}
        renderInput={(props) => (
          <TextField
            {...props}
            variant="filled"
            style={{ width: 300 }}
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
    </Box>
  );
};

export default CountryPicker;
