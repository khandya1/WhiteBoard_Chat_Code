import React, { Fragment } from "react";
import Navbar from "../Navbar";
import Grid from "@material-ui/core/Grid";
import SyntaxEditor from "../SyntaxEditor";
import WhiteBoard from "../WhiteBoard";

const SyntaxRoom = () => {
  
  const [roomId] = useState(window.location.href.substr(window.location.href.lastIndexOf('/') + 1))
  return (
    <Fragment>
        <Navbar roomId = {roomId} />
        <div style={{ backgroundColor: "#F3F7F7", fontFamily: "poppins", padding: '50px' }}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} md={6}>
              <SyntaxEditor roomId = {roomId}/>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <WhiteBoard roomId = {roomId}/>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    )
}

export default SyntaxRoom;
