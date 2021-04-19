import React, { Component, Fragment,useRef } from "react";
import {
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

const WhiteBoard =(props) => {
  const saveableCanvas = useRef(CanvasDraw);

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
              onClick={()=>{saveableCanvas.current.clear();}}
              startIcon={<DeleteIcon />}
              style={{
                fontFamily: "poppins",
                marginLeft: "auto",
                fontWeight: "600",
                color: "white",
                backgroundColor: "#99A3CD",
              }}
            >
              Clear
            </Button>
            <Button
              variant="contained"
              startIcon={<UndoIcon />}
              style={{
                fontFamily: "poppins",
                marginLeft: "auto",
                fontWeight: "600",
                color: "white",
                backgroundColor: "#99A3CD",
              }}
              onClick={() => {
                saveableCanvas.current.undo();
              }}
            >
              Undo
            </Button>
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
        <CanvasDraw 
        ref={saveableCanvas}
        canvasWidth={"auto"} 
        canvasHeight={548}
        hideGrid />
      </Fragment>
    );
 }

export default WhiteBoard;
