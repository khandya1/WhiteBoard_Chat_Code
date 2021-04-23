import React, { Fragment } from "react";
import Navbar from "../Navbar";
import Grid from "@material-ui/core/Grid";
import SyntaxEditor from "../SyntaxEditor";
import WhiteBoard from "../WhiteBoard";

const SyntaxRoom = () => {
  return (
    <Fragment>
      <Navbar />
      <div
        style={{
          backgroundColor: "#f1f3f8",
          fontFamily: "poppins",
          padding: "50px",
        }}
      >
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} md={6}>
            <SyntaxEditor />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <WhiteBoard />
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

export default SyntaxRoom;
