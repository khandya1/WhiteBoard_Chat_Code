import React, { Fragment, useState, useEffect , useRef } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-searchbox";
import useTheme from "@material-ui/core/styles";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-jsx";
import {
  AppBar,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  FormControlLabel,
  Switch,
  Button,
  Dialog,
  DialogTitle,
} from "@material-ui/core";
import localClasses from "./SyntaxEditor.module.css";
import Grid from '@material-ui/core/Grid';
import DeleteIcon from "@material-ui/icons/Delete";
import {
  languages,
  defaultValue,
  langMode,
  LangOptions,
  revLangMode,
  langId,
  themes,
} from "./LanguageData";
import ShareIcon from "@material-ui/icons/Share";



//extracting all the languages recquired
languages.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

//extracting themes
themes.forEach((theme) => require(`ace-builds/src-noconflict/theme-${theme}`));

const axios = require("axios").default;
const useStyles = makeStyles((mutheme) => ({
  formControl: {
    margin: mutheme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: mutheme.spacing(2),
  },
}));

const ICE = (props) => {

  const handleIChange = (newValue) => {
    props.onInputChange(newValue)
  }
  
    return (
      <AceEditor
        mode="c_cpp"
        theme="monokai"
        height="150px"
        width={"auto"}
        onChange={handleIChange}
        value={props.inputValue}
        fontSize={18}
      />
    )
  }

const SyntaxEditor = (props) => {
  const [value, setValue] = useState(defaultValue);
  const [currLang, setCurrLang] = useState("C++");
  const [mode, setMode] = useState(langMode["C++"]);
  const [theme, setTheme] = useState("monokai");
  const [fontSize, setFontSize] = useState(16);
  const [autoCompletion, setautoCompletion] = useState(true);
  const [codeInput, setCodeInput] = useState("")
  const [codeOutput, setCodeOutput] = useState("")
  const [isCompiling, setIsCompiling] = useState(false)

  var codeToken = 0;
  const classes = useStyles();

  useEffect(() => {
    setMode(langMode[currLang]);
  }, [currLang]);

  props.socket.on("message", (newValue) => {
    setValue(newValue);
  });

  const handleChange = (newValue) => {
    setValue(newValue);
    props.socket.emit("message", newValue);
  };

  const handleInputChange = (newInput) => {
    setCodeInput(newInput);
  }

  const handleCodeRun = async () => {
    setIsCompiling(true);
    var options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "x-rapidapi-key": "19d0efcb30msha1114de32fcfce0p13d849jsnab6f1292bb33",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      },
      data: {
        language_id: langId[currLang],
        source_code: value,
        stdin: "codeInput",
      },
    };
    console.log(options);
    await axios
      .request(options)
      .then(function (response) {
        codeToken = response.data.token;
        console.log(codeToken);
      })
      .catch(function (error) {
        console.error(error);
      });

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    await delay(7000);
    console.log("Waited 7s");

    var options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions/" + codeToken,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "x-rapidapi-key": "19d0efcb30msha1114de32fcfce0p13d849jsnab6f1292bb33",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setCodeOutput(response.data.stdout);
        setIsCompiling(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };


  const IONavbar = (props) => {
    return (
      <AppBar position="static" style={{ backgroundColor: "#000A29" }}>
        <Typography
            variant="h6"
            style={{
              fontFamily: "poppins",
              color: "white",
              marginRight: "auto",
              marginTop: "auto",
              marginBottom: "auto",
              marginLeft: "auto",
              fontWeight: "400",
              padding: "3px 2px"
            }}
          >
            {props.type}
          </Typography>
      </AppBar>
    );

  };



  return (
    <Fragment>
      <Dialog fullWidth={true} maxWidth={"sm"} open={isCompiling}>
        <DialogTitle>Compiling ...</DialogTitle>
        <div className={localClasses.loader}>
          <div style={{ marginLeft: "auto", marginRight: "auto" }}>
            <span>
              <ShareIcon style={{ fontSize: 125 }} />
            </span>
            <span className={localClasses.arrow}>></span>
          </div>
        </div>
      </Dialog>
      <AppBar position="static" style={{ backgroundColor: "#000A29" }}>
        <div className={localClasses.Editor__navbar}>
          <Typography
            variant="h5"
            style={{
              fontFamily: "poppins",
              color: "#f1f3f8",
              marginRight: "auto",
              marginTop: "auto",
              marginBottom: "auto",
              marginLeft: "30px",
              fontWeight: "800",
            }}
          >
            &nbsp;Code<span style={{ color: "#FFD500" }}>Editor</span>
          </Typography>

          {console.log(props.roomId)}
          <Toolbar>
            <FormControl
              size="small"
              variant="outlined"
              className={classes.formControl}
            >
              <InputLabel
                id="mode-label"
                style={{ fontFamily: "poppins", color: "#FFD500" }}
              >
                Language
              </InputLabel>
              <Select
                name="mode"
                labelId="mode-label"
                id="select-mode"
                value={langMode[currLang]}
                onChange={(e) => {
                  setCurrLang(revLangMode[e.target.value]);
                }}
                label="Language"
                style={{ fontFamily: "poppins", color: "#ffffff" }}
              >
                {LangOptions.map((language) => (
                  <MenuItem value={langMode[language]} key={language}>
                    <span className={localClasses.Menu__options}>
                      {language}
                    </span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              size="small"
              variant="outlined"
              className={classes.formControl}
            >
              <InputLabel
                id="theme-label"
                style={{ fontFamily: "poppins", color: "#FFD500" }}
              >
                Theme
              </InputLabel>
              <Select
                name="Theme"
                labelId="theme-label"
                id="select-theme"
                onChange={(e) => setTheme(e.target.value)}
                value={theme}
                label="Theme"
                style={{ fontFamily: "poppins", color: "#ffffff" }}
              >
                {themes.map((lang) => (
                  <MenuItem key={lang} value={lang}>
                    <span className={localClasses.Menu__options}> {lang} </span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              size="small"
              variant="outlined"
              className={classes.formControl}
            >
              <InputLabel
                id="font-label"
                style={{ fontFamily: "poppins", color: "#FFD500" }}
              >
                Font Size
              </InputLabel>
              <Select
                name="Theme"
                labelId="font-label"
                id="select-font"
                onChange={(e) => setFontSize(e.target.value)}
                value={fontSize}
                label="Font Size"
                style={{ fontFamily: "poppins", color: "#ffffff" }}
              >
                {[14, 16, 18, 20, 24, 28, 32, 40].map((size) => (
                  <MenuItem key={size} value={size}>
                    <span className={localClasses.Menu__options}> {size} </span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Toolbar>
        </div>
      </AppBar>
      <AceEditor
        mode={mode}
        theme={theme}
        height="550px"
        width={"auto"}        
        value={value}
        onChange={handleChange}

        fontSize={fontSize}
        showPrintMargin
        showGutter
        highlightActiveLine
        name="CODEEDITOR"
        setOptions={{
          useWorker: false,
          enableLiveAutocompletion: autoCompletion,
        }}
      />
      <AppBar position="static" style={{ backgroundColor: "#000A29",  marginBottom: "10px" }}>
        <Toolbar>
          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={autoCompletion}
                onChange={() => {
                  setautoCompletion(!autoCompletion);
                }}
                name="EnableAutoCompletion"
              />
            }
            label={
              <Typography>
                <span style={{ color: "white" }}>Enable Auto-complete</span>
              </Typography>
            }
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<DeleteIcon />}
            style={{
              fontFamily: "poppins",
              marginLeft: "auto",
              fontWeight: "600",
              color: "white",
            }}
          >
            Compile
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCodeRun}
            startIcon={<DeleteIcon />}
            style={{
              fontFamily: "poppins",
              marginLeft: "10px",
              fontWeight: "600",
              color: "#fff",
              backgroundColor: "#FFD500",
            }}
          >
            Run
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={6}>
        <IONavbar type={"Input"} />
          <ICE inputValue = {codeInput} onInputChange = {handleInputChange}/>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
        <IONavbar type = {"Output"}/>
          <AceEditor
            mode="c_cpp"
            theme="monokai"
            height="150px"
            width={"auto"}
            readOnly
            value={codeOutput}
            fontSize={fontSize}
            showPrintMargin
            showGutter
            name="OUTPUTEDITOR"
            setOptions={{
              useWorker: false,
              enableLiveAutocompletion: false,
            }}
          />
        </Grid>
      </Grid>


    </Fragment>
  );
};

export default SyntaxEditor;
