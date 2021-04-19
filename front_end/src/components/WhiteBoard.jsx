import React, { Component, Fragment } from "react";
import {
  InputLabel,
  MenuItem,
  Select,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import CanvasDraw from "react-canvas-draw";
import UndoIcon from "@material-ui/icons/Undo";
import DeleteIcon from "@material-ui/icons/Delete";
import ReactResizeDetector from "react-resize-detector";

class WhiteBoard extends Component {
  render() {
    return (
      <Fragment>
        <AppBar position="static" style={{ backgroundColor: "#393b44" }}>
          <Toolbar>
            <Typography
              variant="h5"
              style={{ fontFamily: "poppins", color: "white" }}
            >
              White Board
            </Typography>
            <Button
              variant="contained"
              startIcon={<ShareIcon />}
              style={{
                fontFamily: "poppins",
                marginLeft: "auto",
                fontWeight: "600",
                color: "white",
                backgroundColor: "#99A3CD",
              }}
            >
              Share
            </Button>
          </Toolbar>
        </AppBar>
        <CanvasDraw canvasWidth={690} canvasHeight={548} />
      </Fragment>
    );
  }
}

export default WhiteBoard;
