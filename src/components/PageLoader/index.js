import React from "react";
import {Backdrop, CircularProgress} from '@mui/material';



function PageLoader({status}) {

    const [state, setState] = React.useState(false);

    React.useEffect(() => {
      setState(status);
    }, [status]);

    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={state}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
}
  
export default PageLoader;