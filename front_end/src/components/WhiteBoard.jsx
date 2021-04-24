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
import localClasses from "./WhiteBoard.module.css"

const WhiteBoard =(props) => {
  const saveableCanvas = useRef(CanvasDraw);

    return (
      <Fragment>
        <AppBar position="static" style={{ backgroundColor: "#000A29" }}>
        <div className={localClasses.Editor__navbar}>
          <Toolbar>
            <Typography
              variant="h5"
              style={{ fontFamily: "poppins", color: "white" , marginRight: "auto", marginTop: "auto", marginBottom: "auto", marginLeft: "30px", fontWeight: "800" }}
            >
              &nbsp;White<span style={{ "color": "#FFD500"}}>Board</span>
          </Typography>
          <Toolbar ></Toolbar>
            <Button
              variant="contained"
              color ="primary"
              onClick={()=>{saveableCanvas.current.clear();}}
              startIcon={<DeleteIcon />}
              style={{
                fontFamily: "poppins",
                marginLeft: "auto",
                fontWeight: "600",
                color: "white",
                
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
          </div>
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
