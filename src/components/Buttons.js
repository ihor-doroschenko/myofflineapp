import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import React from 'react';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Buttons = ({ handleSubmit, downloadCSV, downloadPhoto }) => {
  const classes = useStyles();
  return (
    <Box>
      <Button
        variant='contained'
        color='primary'
        className={classes.button}
        endIcon={<SendIcon />}
        onClick={handleSubmit}>
        Abschicken
      </Button>
      <br />
      <br />
      <Button variant='contained' color='primary' onClick={() => downloadCSV()}>
        Download All Data
      </Button>
      <br />
      <br />
      <Button variant='contained' color='primary' onClick={() => downloadPhoto()}>
        Download Photo
      </Button>
    </Box>
  );
};

export default Buttons;
