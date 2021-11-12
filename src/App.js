import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./utils/styles";
import AdminRoutes from "./routes/admin";
import UserRoutes from "./routes/user";

import CONSTANTS from "./utils/constants";

import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <HelmetProvider>
        <Helmet>
          <title>{CONSTANTS.Sitename}</title>
        </Helmet>
        <CssBaseline />
        <AdminRoutes />
        <UserRoutes />
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
