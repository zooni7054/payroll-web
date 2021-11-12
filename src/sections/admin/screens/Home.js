import React from "react";
import { Container, Card, Grid, Typography } from "@mui/material";

import { Helmet } from "react-helmet-async";

function Home() {
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Card>
        <Typography variant="h1" color="initial">
          Dashboard
        </Typography>
      </Card>
    </div>
  );
}

export default Home;
