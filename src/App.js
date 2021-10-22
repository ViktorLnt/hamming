import React, {
  useState,
  useContext,
  createContext,
  useMemo,
  useEffect,
} from "react";
import "./App.css";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Paper, Grid, TextField, Button } from "@mui/material";
import Graph from "./Graph.js";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function ToggleColorMode() {
  const [mode, setMode] = useState("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

function App() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [newNumber, setNewNumber] = useState("");
  const [numbersList, setNumbersList] = useState([]);
  const [distances, setDistances] = useState([]);
  const [inputError, setInputError] = useState(false);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const hamming_distance = (a, b) => {
      let counter = 0;
      let aString = a.toString();
      let bString = b.toString();
      for (var i = 0; i < 5; i++) {
        if (aString[i]!==bString[i]){
          counter++;
        }
      }
      return counter;
    };
    
    let listCopy = [...numbersList];
    let returnValue = [];
      while (listCopy[1] !== undefined) {
        returnValue.push(hamming_distance(listCopy[0], listCopy[1]));
        listCopy.shift();
      }
    setDistances(returnValue);
  }, [numbersList]);

  return (
    <Paper
      style={{
        height: "100vh",
        width: "100vw",
        textAlign: "center",
        overflowY: "hidden",
        overflowX: "hidden",
      }}
    >
      <Grid container direction="column">
        {/* MODE */}
        <div>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              color: "text.primary",
              borderRadius: 1,
              p: 3,
            }}
          >
            {theme.palette.mode} mode
            <IconButton
              sx={{ ml: 1 }}
              onClick={colorMode.toggleColorMode}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Box>
        </div>
        {/* INPUT */}
        <div>
          <TextField
            onChange={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 5);
              setNewNumber(e.target.value);
              if (newNumber.length === 4) {
                setInputError(false);
              }
            }}
            style={{ width: "15%" }}
            type="number"
            label="Add Number"
            size="small"
            value={newNumber}
            error={inputError}
            helperText={inputError ? "5 digits required" : ""}
          />
          <Button
            onClick={() => {
              newNumber.length === 5
                ? setNumbersList((prevList) =>
                    [...prevList, parseInt(newNumber)].sort(function (a, b) {
                      return a - b;
                    })
                  )
                : setInputError(true);
              setNewNumber("");
            }}
            variant="contained"
            size="large"
          >
            <ArrowForwardIcon />
          </Button>
        </div>
        {/* LIST */}
        <div className="list">
          <div>
            Number(s):
            {numbersList.map((ArrayItem) => (
              <div key={ArrayItem}>{ArrayItem}</div>
            ))}
          </div>
          <div>
            Hamming distance(s):
            {distances &&
              distances.map((ArrayItem) => (
                <div key={ArrayItem}>{ArrayItem}</div>
              ))}
          </div>
        </div>
        {/* GRAPH */}
        {/* <Graph data={graphData}/> */}
      </Grid>
    </Paper>
  );
}
