import React, {createContext, useContext, useState} from "react";

const ThemeContext =createContext(null);
function ThemeProvider(props){

    const themes = {
        light:{
            primary : '#6750A4',
            surfaceVariant: 'rgba(231, 224, 236, 1)',
            onSurfaceVariant: '#49454F',
            surface: '#FFFBFE',
            onSurface: '#1C1B1F',
            outline: '#79747E',
            scrim:'rgb(0,0,0,0.25)',
            tertiaryContainer:'#FFD8E4',
            onPrimary: '#ffffff',
            errorContainer: '#F9DEDC',
            primaryContainer: '#EADDFF',
            onPrimaryContainer: '#21005D',
            error : '#B3261E',
            surface3: `linear-gradient(0deg, #FFFBFE, #FFFBFE),` +
                `linear-gradient(0deg, rgba(103, 80, 164, 0.11), rgba(103, 80, 164, 0.11))`

        },
        dark: {
            primary : '#D0BCFF',
            surfaceVariant: '#49454F',
            onSurfaceVariant: '#CAC4D0',
            surface: '#1C1B1F',
            onSurface: '#E6E1E5',
            outline: '#79747E',
            scrim:'rgb(0,0,0,0.25)',
            tertiaryContainer:'#633B48',
            onPrimary: '#381E72',
            errorContainer: '#8C1D18',
            primaryContainer: '#4F378B',
            onPrimaryContainer: '#EADDFF',
            error : '#F2B8B5',
            surface3: 'linear-gradient(0deg, #1C1B1F, #1C1B1F),' +
                '    linear-gradient(0deg, rgba(208, 188, 255, 0.11), rgba(208, 188, 255, 0.11))'
        }
    };
    const [ theme,setTheme ] = useState('light');
    return <ThemeContext.Provider {...props} value={[ theme,setTheme ]}/>
}
function useTheme(){
    const context = useContext(ThemeContext);
    if(!context) throw new Error('Not inside the provider.')
    return context;
}
export { ThemeProvider, useTheme }
