//Importing the dependencies and required components
import { React, useState } from 'react';
import { IconButton } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Brightness4, Brightness7 } from '@material-ui/icons';

// Styling the background and text color for the light theme
const themeLight = createMuiTheme({
    palette: {
        background: {
            default: "#FFFFFF"
        }
    }
});

// Styling the background and text color for the dark theme
const themeDark = createMuiTheme({
    palette: {
        background: {
            default: "#222222"
        },
        text: {
            primary: "#ffffff"
        }
    }
});

function ToggleTheme() {
    // use of useState to keep the status of theme changer
    const [light, setLight] = useState(true);

    return (
        <   // Will return the light theme if the current theme is light else dark
            MuiThemeProvider theme={light ? themeLight : themeDark}>
            <CssBaseline />
            {   //If the light is true, return the sun icon which on click, make the theme light according to style specified 
                light ? (
                <IconButton onClick={() => setLight(prev => !prev)} component="span">
                    <Brightness4 style={{ color: '#000000', fontSize: 35 }} />
                </IconButton>
            ) : (
                // if the light is false, return the moon icon which on click, make the theme dark according to style specified
                <IconButton onClick={() => setLight(prev => !prev)} component="span">
                    <Brightness7 style={{ color: '#FFFFFF', fontSize: 35 }} />
                </IconButton>
            )}
        </MuiThemeProvider>
    )
}

export default ToggleTheme;