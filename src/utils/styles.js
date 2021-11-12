import { createTheme } from "@mui/material/styles";
import { green, purple } from '@mui/material/colors';


const theme = createTheme({
    palette: {
        background: {
            default: "#f5f5f5",
        },
        text: {
            primary: "#000",
        },
        
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                  borderRadius: "6px",
                  padding: "30px",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                  borderRadius: "6px",
                  padding: "10px 15px",
                },
            },
        },
        
    },
});

export default theme;