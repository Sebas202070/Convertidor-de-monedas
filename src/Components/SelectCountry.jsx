import { Autocomplete, Grid, Skeleton, TextField } from "@mui/material";
import React, { useContext } from "react";
import UseAxios from "../Hooks/UseAxios";
import { CurrencyContext } from "../Context/CurrencyContextProvider";

const SelectCountry = (props) => {
  const [data, loading, error] = UseAxios("https://restcountries.com/v3.1/all");
  const { value, setValue, label } = props;
  const { fromCurrency } = useContext(CurrencyContext);

  const dataFiltered = data.filter((f) => "currencies" in f);
  const dataCountries = dataFiltered.map((item) => {
    return `${item.flag} ${Object.keys(item.currencies)[0]} - ${
      item.name.common
    }`;
  });
  console.log(dataCountries);

  if (loading) {
    return (
      <Grid item xs={12} md={3}>
        <Skeleton variant="rounded" height={70} />
      </Grid>
    );
  }

  if (error) {
    return "Something went wrong!!";
  }
  return (
    <Grid item xs={12}>
      <Autocomplete
        value={value}
        options={dataCountries}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        disableClearable
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </Grid>
  );
};

export default SelectCountry;
