import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { Button, makeStyles, Paper } from "@material-ui/core";

function valuetext(value) {
  return `${value} Dinar`;
}
const useStyles = makeStyles({
  root: {
    width: 700,
    padding: 20,
    margin: 20,
  },

  gender: {},
});
const Filter = () => {
  const classes = useStyles();
  const [gender, setGender] = React.useState("female");
  const [price, setPrice] = React.useState([20, 37]);
  const handleChange = (event) => {
    setGender(event.target.value);
  };
  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };

  return (
    <Paper elevation={7} className={classes.root}>
      <FormControl component="fieldset" className={classes.gender}>
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender"
          value={gender}
          onChange={handleChange}
          row
        >
          <FormControlLabel
            value="female"
            control={<Radio />}
            color="secondary"
            label="Female"
          />
          <FormControlLabel
            value="male"
            control={<Radio />}
            color="primary"
            label="Male"
          />
        </RadioGroup>
      </FormControl>
      <div>
        <Typography id="discrete-slider" gutterBottom>
          Pointure
        </Typography>
        <Slider
          defaultValue={30}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={10}
          marks
          min={10}
          max={110}
        />
      </div>
      <div>
        <Typography id="range-slider" gutterBottom>
          Prix
        </Typography>
        <Slider
          value={price}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
        />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button variant="contained">Filter</Button>
      </div>
    </Paper>
  );
};

export default Filter;
