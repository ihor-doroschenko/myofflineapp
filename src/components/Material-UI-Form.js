import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from '@mui/material/InputAdornment';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

class MaterialUIForm extends Component {
  constructor() {
    super();
    this.state = {
      streckennr: '',
      km: '',
      meters: '',
      seite: 'L',
      sonstiges: '',
      punktnr: '',
      gvp_laenge: '',
      datum: '',
      photo: null,
    };
  }

  handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const newValue = type === 'file' ? files[0] : type === 'radio' ? checked : value;
    this.setState({ [name]: newValue });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  }

  render() {
    return (
      <form id="Form" action="/" method="post" encType="multipart/form-data" onSubmit={this.handleSubmit}>
        <TextField
          label="Streckennummer"
          id="streckennr"
          name="streckennr"
          className="required"
          required
          value={this.state.streckennr}
          onChange={this.handleChange}
          fullWidth
        /><br /><br />

        <TextField
          label="Kilometrierung"
          id="km"
          name="km"
          type="number"
          step="1"
          className="required"
          required
          placeholder="z.B.145"
          value={this.state.km}
          onChange={this.handleChange}
          fullWidth
          InputProps={{
            endAdornment: <InputAdornment position="end">,</InputAdornment>,
          }}
        />
        <TextField
          id="meters"
          name="meters"
          type="number"
          step="0.01"
          pattern="\d+(\.\d{2})?"
          required
          placeholder="02"
          value={this.state.meters}
          onChange={this.handleChange}
          fullWidth
        /><br /><br />

        <FormControl component="fieldset">
          <FormLabel component="legend">Seite</FormLabel>
          <RadioGroup
            id="seite"
            name="seite"
            value={this.state.seite}
            onChange={this.handleChange}
          >
            <FormControlLabel value="L" control={<Radio />} label="L" />
            <FormControlLabel value="R" control={<Radio />} label="R" />
          </RadioGroup>
        </FormControl>
        <TextField
          label="Sonstiges"
          id="sonstiges"
          name="sonstiges"
          value={this.state.sonstiges}
          onChange={this.handleChange}
          fullWidth
        /><br /><br />

        <TextField
          label="Punktnummer"
          id="punktnr"
          name="punktnr"
          className="required"
          required
          value={this.state.punktnr}
          onChange={this.handleChange}
          fullWidth
        /><br /><br />

        <TextField
          label="GVP Länge, mm"
          id="gvp_laenge"
          name="gvp_laenge"
          className="required"
          required
          value={this.state.gvp_laenge}
          onChange={this.handleChange}
          fullWidth
        /><br /><br />

        <TextField
          label="Datum"
          id="datum"
          name="datum"
          className="required"
          required
          value={this.state.datum}
          onChange={this.handleChange}
          fullWidth
        /><br /><br />

        <input
          type="file"
          id="photo"
          name="photo"
          accept="image/*;capture=camera"
          required
          onChange={this.handleChange}
        /><br /><br />

        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
    );
  }
}

export default MaterialUIForm;
