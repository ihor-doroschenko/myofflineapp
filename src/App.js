import { Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import './App.css';
import Buttons from './components/Buttons';
import MainForm from './components/MainForm';

const useStyles = makeStyles(theme => ({
  root: {
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    backgroundColor: '#f4f4f4',
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
    },
  },
}));

const LOCAL_STORAGE_KEY = 'data';

function App() {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    streckennummer: '',
    photo: null,
  });

  const [submissions, setSubmissions] = useState([]); // Store all submissions

  useEffect(() => {
    // Load data from local storage
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setSubmissions(parsedData);
    }
  }, []);

  useEffect(() => {
    // Update local storage whenever the submissions array changes
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(submissions));
  }, [submissions]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoChange = e => {
    const photo = e.target.files[0];
    setFormData({
      ...formData,
      photo,
    });
  };

  const handleSubmit = () => {
    const reader = new FileReader();
    reader.onload = event => {
      const base64Photo = event.target.result;
      // Append new submission to the array
      setSubmissions([...submissions, { ...formData, photo: base64Photo }]);
      // Save to local storage each time the user submits
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify([...submissions, { ...formData, photo: base64Photo }])
      );
    };
    reader.readAsDataURL(formData.photo);
  };

  const downloadPhoto = React.useCallback(() => {
    for (let el of submissions) {
      const link = document.createElement('a');
      link.href = el.photo;
      link.download = `${el.streckennummer}.png`;
      link.click();
    }
  }, [submissions]);

  const downloadCSV = () => {
    // Generate CSV content
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Streckennummer,Photo\n' +
      submissions.map(entry => `"${entry.streckennummer}",${entry.photo}\n`).join('');

    // Create and trigger a download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className={classnames(classes.root, 'appWrapper')}>
      <Paper elevation={3} classes={classes.paper}>
        <Box>
          <Typography style={{ padding: 16 }} variant='h4'>
            Außendienst App
          </Typography>
        </Box>
        <MainForm
          formData={formData}
          handleInputChange={handleInputChange}
          handlePhotoChange={handlePhotoChange}
        />
        <Buttons
          handleSubmit={handleSubmit}
          downloadCSV={downloadCSV}
          downloadPhoto={downloadPhoto}
        />
      </Paper>
    </div>
  );
}

export default App;
