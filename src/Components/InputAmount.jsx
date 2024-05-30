import { Grid, InputAdornment, TextField } from "@mui/material";
import React, { useContext } from "react";
import { CurrencyContext } from "../Context/CurrencyContextProvider";

const InputAmount = () => {
  const { firstAmount, setFirstAmount } = useContext(CurrencyContext);

  return (
    <Grid item xs={12}>
      <TextField
        label="Amount"
        fullWidth
        value={firstAmount}
        onChange={(e) => setFirstAmount(e.target.value)}
        InputProps={{
          type: "number",
          startAdornment: <InputAdornment>$</InputAdornment>,
        }}
      />
    </Grid>
  );
};

export default InputAmount;
