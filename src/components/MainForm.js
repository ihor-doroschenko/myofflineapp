import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import React from 'react';

const MainForm = ({ formData, handleInputChange, handlePhotoChange }) => {
  return (
    <Box display='flex' flexDirection='column'>
      <Box padding='5px' height='50px'>
        <TextField
          required
          style={{ width: '100%' }}
          label='Streckennummer'
          name='streckennummer'
          value={formData.streckennummer}
          onChange={handleInputChange}
        />
      </Box>
      <Box
        display='flex'
        flexDirection='row'
        alignItems='flex-end'
        justifyContent='flex-start'
        height='50px'>
        <Typography style={{ padding: 6, width: '100%', textAlign: 'left' }}>
          Kilometrierung
        </Typography>
      </Box>

      <Box display='flex' flexDirection='row' alignItems='center' padding='5px' height='50px'>
        <TextField
          required
          label='Kilometrierung'
          id='km'
          style={{ paddingRight: '5px' }}
          name='km'
          type='number'
          placeholder='z.B.145'
          value={formData.km}
          onChange={handleInputChange}
        />
        <TextField name='meters' type='number' placeholder='02' onChange={handleInputChange} />
      </Box>

      <Box
        display='flex'
        flexDirection='row'
        alignItems='flex-end'
        justifyContent='flex-start'
        height='50px'>
        <Typography style={{ padding: 6, width: '100%', textAlign: 'left' }}>Seite</Typography>
      </Box>

      <FormControl component='fieldset'>
        <RadioGroup
          row
          required
          id='seite'
          name='seite'
          value={formData.seite}
          onChange={formData.handleChange}>
          <FormControlLabel value='L' control={<Radio />} label='L' />
          <FormControlLabel value='R' control={<Radio />} label='R' />
        </RadioGroup>
      </FormControl>
      <TextField
        label='Sonstiges'
        id='sonstiges'
        name='sonstiges'
        value={formData.sonstiges}
        onChange={formData.handleChange}
      />

      <Input
        required
        type='file'
        name='photo'
        accept='image/*;capture=camera'
        onChange={handlePhotoChange}
      />
    </Box>
  );
};

export default MainForm;
