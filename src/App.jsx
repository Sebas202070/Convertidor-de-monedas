import { Box, Container, Grid, Typography } from "@mui/material";
import "./App.css";
import InputAmount from "./Components/InputAmount";
import SelectCountry from "./Components/SelectCountry";
import SwitchCurrency from "./Components/SwitchCurrency";
import { useContext, useEffect, useState } from "react";
import { CurrencyContext } from "./Context/CurrencyContextProvider";
import axios from "axios";

function App() {
  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
    setFirstAmount,
  } = useContext(CurrencyContext);

  const baseCurrency = fromCurrency.split(" ")[1];

  const currency = toCurrency.split(" ")[1];
  console.log(currency);

  useEffect(() => {
    if (firstAmount) {
      axios(
        `https://v6.exchangerate-api.com/v6/e21c471862a02b00d9c3e535/latest/${baseCurrency}` /*  , {
        params: {
          apikey: "fca_live_NFFpE4mLdvEjZS20lCfAl3F21Dkl6T6ThGKSfbXy",
          base_currency: baseCurrency,
          currencies: currency,
        },
      } */
      )
        .then((response) =>
          setResultCurrency(response.data.conversion_rates[currency])
        )
        .catch((error) => console.log(error));
    }
  }, [firstAmount, fromCurrency, toCurrency]);

  const [resultCurrency, setResultCurrency] = useState("");

  console.log(resultCurrency);

  const boxStyles = {
    background: "white",
    marginTop: 1,
    textAlign: "center",
    minHeight: "20rem",
    padding: "1rem 2rem",
    borderRadius: 2,
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,1)",
    position: "relative",
  };
  return (
    <Container maxWidth="md" sx={boxStyles}>
      <Typography variant="h5" sx={{ marginBottom: "2rem" }}>
        Convertidor de Monedas
      </Typography>
      <Grid container spacing={1}>
        <InputAmount />
        <SelectCountry
          value={fromCurrency}
          setValue={setFromCurrency}
          label="From"
        />
        <SwitchCurrency />
        <SelectCountry value={toCurrency} setValue={setToCurrency} label="To" />
      </Grid>
      {firstAmount ? (
        <Box sx={{ textAlign: "left", marginTop: "1rem" }}>
          <Typography>
            $ {firstAmount} {fromCurrency} =
          </Typography>

          <Typography
            variant="h5"
            sx={{ marginTop: "5px", fontWeight: "bold" }}
          >
            $ {resultCurrency /* .toFixed(2) */ * firstAmount} {toCurrency}{" "}
            (OFICIAL)
          </Typography>
        </Box>
      ) : (
        ""
      )}

      {firstAmount && currency === "ARS" ? (
        <Box sx={{ textAlign: "left", marginTop: "1rem" }}>
          <Typography>
            $ {firstAmount} {fromCurrency} =
          </Typography>

          <Typography
            variant="h5"
            sx={{ marginTop: "5px", fontWeight: "bold" }}
          >
            ${" "}
            {resultCurrency /* .toFixed(2) */ * firstAmount +
              resultCurrency * firstAmount * 0.4}{" "}
            {toCurrency} (BLUE)
          </Typography>
          <Typography
            variant="h5"
            sx={{ marginTop: "5px", fontWeight: "bold" }}
          ></Typography>
        </Box>
      ) : (
        ""
      )}
    </Container>
  );
}

export default App;
