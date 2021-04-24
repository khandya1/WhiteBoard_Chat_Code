import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar, Typography, Button, CardMedia } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";

const Navbar = (props) => (
  <AppBar position="static" style={{ backgroundColor: "#393b44" }}>
    <Toolbar>
    <Typography variant="h5" style={{ "color": "white", 'fontFamily': "poppins", "fontWeight": "800" }}>
        &nbsp;WhiteBoard<span style={{ "color": "#FFD500"}}>Chat&Code</span>
        </Typography>
      <Button
        variant="contained"
        startIcon={<PersonIcon />}
        color = "primary"
        style={{
          fontFamily: "poppins",
          marginLeft: "auto",
          fontWeight: "600",
          color: "#f1f3f8"
        }}
      >
        RoomId : {props.roomId}
      </Button>
    </Toolbar>
  </AppBar>
);

export default Navbar;
