import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar, Typography, Button, CardMedia } from "@material-ui/core";
import "fontsource-poppins";
import PersonIcon from "@material-ui/icons/Person";

const Navbar = (props) => (
  <AppBar position="static" style={{ backgroundColor: "#393b44" }}>
    <Toolbar>
      <Button
        variant="contained"
        startIcon={<PersonIcon />}
        style={{
          fontFamily: "poppins",
          marginLeft: "auto",
          fontWeight: "600",
          color: "#f1f3f8",
          backgroundColor: "#99A3CD",
        }}
      >
        Login
      </Button>
    </Toolbar>
  </AppBar>
);

export default Navbar;
