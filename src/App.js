import Typography from "@material-ui/core/Typography";
import React, { useState, useEffect } from "react";
import "./App.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const LOCAL_STORAGE_KEY = "data";

function App() {
    const [formData, setFormData] = useState({
        streckennummer: "",
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlePhotoChange = (e) => {
        const photo = e.target.files[0];
        setFormData({
            ...formData,
            photo,
        });
    };

    const handleSubmit = () => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const base64Photo = event.target.result;
            // Append new submission to the array
            setSubmissions([...submissions, { ...formData, photo: base64Photo }]);
            // Save to local storage each time the user submits
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...submissions, { ...formData, photo: base64Photo }]));
        };
        reader.readAsDataURL(formData.photo);
    };

    const downloadPhoto = (base64Photo, streckennummer) => {
        const link = document.createElement('a');
        link.href = base64Photo;
        link.download = `${streckennummer}.png`;
        link.click();
    };

    const downloadCSV = () => {
        // Generate CSV content
        const csvContent =
            "data:text/csv;charset=utf-8," +
            "Streckennummer,Photo\n" +
            submissions
                .map((entry) => `"${entry.streckennummer}",${entry.photo}\n`)
                .join("");

        // Create and trigger a download link
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "data.csv");
        document.body.appendChild(link);
        link.click();
    };

    return (
        <div className="App">
            <Typography style={{ padding: 16 }} variant="h3">
                Außendienst App
            </Typography>
            <TextField
                required
                label="Streckennummer"
                name="streckennummer"
                value={formData.streckennummer}
                onChange={handleInputChange}
            />
            <br /><br />
            <TextField
                required
                label="Kilometrierung"
                id="km"
                name="km"
                type="number"
                placeholder="z.B.145"
                value={formData.km}
                onChange={handleInputChange}
            />
            <TextField
                name="meters"
                type="number"
                placeholder="02"
                onChange={handleInputChange}
            />
            <br /><br />
            <FormControl component="fieldset">
                <FormLabel component="legend">Seite</FormLabel>
            <RadioGroup
                required
                id="seite"
                name="seite"
                value={formData.state.seite}
                onChange={formData.handleChange}
            >
                <FormControlLabel value="L" control={<Radio />} label="L" />
                <FormControlLabel value="R" control={<Radio />} label="R" />
            </RadioGroup>
            </FormControl>
            <TextField
            label="Sonstiges"
            id="sonstiges"
            name="sonstiges"
            value={formData.state.sonstiges}
            onChange={formData.handleChange}
            /><br /><br />
            <Input
                required
                type="file"
                name="photo"
                accept="image/*;capture=camera"
                onChange={handlePhotoChange}
            />
            <br /><br />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
            >
                Submit
            </Button>
            <br /><br />
            <Button
                variant="contained"
                color="primary"
                onClick={()=> downloadCSV(submissions, setSubmissions)}
            >
                Download All Data
            </Button>
            <br /><br />
            <Button
                variant="contained"
                color="primary"
                onClick={() => downloadPhoto(formData.streckennummer)}
            >
                Download Photo
            </Button>
        </div>
    );
}

export default App;


