import React, {
  useState,
  useContext,
  useEffect,
} from "react";
import "./App.css";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Paper, Grid, TextField, Button } from "@mui/material";
import Graph from "./barchart_components/Graph.js";


export default function App({ColorModeContext}) {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const [newNumber, setNewNumber] = useState("");
  const [numbersList, setNumbersList] = useState([]);
  const [distances, setDistances] = useState([]);
  const [inputError, setInputError] = useState(false);
  const [inputErrorText, setInputErrorText] = useState(" ");
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const hamming_distance = (a, b) => {
      let counter = 0;
      let aString = a.toString();
      let bString = b.toString();
      for (var j = 0; j < 5; j++) {
        if (aString[j] !== bString[j]) {
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

    let graphDataLoader = [];
    for (var i = 0; i < returnValue.length; i++) {
      graphDataLoader.push({ value: returnValue[i], id: i + 1 });
    }
    setGraphData(graphDataLoader);
  }, [numbersList]);

  const helperFunction = () => {
    setInputError(false);
    setInputErrorText(" ");
    setNumbersList((prevList) =>
          [...prevList, parseInt(newNumber)].sort(function (a, b) {
            return a - b;
          })
        );
  }

  const helperFunction2 = () => {
    setInputError(true);
    setInputErrorText("Min 5 digits");
  }

  const handleClick = () => {
    if (numbersList.length<5) {
      setInputError(false);
      setInputErrorText(" ");
      newNumber.length === 5
      ? helperFunction()
      : helperFunction2()
    } else {
      setInputError(true);
      setInputErrorText("Max 5. Click a number to delete");
    }
    
    setNewNumber("");
  };

  const handleDelete = (ArrayItem) => {
      const index = numbersList.indexOf(ArrayItem);
      const firstHalf = numbersList.slice(0, index);
      const secondHalf = numbersList.slice(index+1);

      setNumbersList([...firstHalf, ...secondHalf]);
  };

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
        <div className="input">
          <TextField
            onChange={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 5);
              setNewNumber(e.target.value);
              if (newNumber.length === 4) {
                setInputError(false);
                setInputErrorText(" ");
              }
            }}
            style={{ width: "15%" }}
            type="number"
            pattern="[0-9]*"
            label="Add Number"
            size="small"
            value={newNumber}
            error={inputError}
            helperText={inputErrorText}
          />
          <Button onClick={handleClick} variant="contained" size="large" backgroundcolor="#5266d6">
            <ArrowForwardIcon />
          </Button>
        </div>
        {/* LISTS */}
        <div className="list">
          <div>
            Number(s):
            <div className="number-group">
              {numbersList.map((ArrayItem, idx) => (
                <div onClick={()=>handleDelete(ArrayItem)} className="number-group-item" key={idx}>
                  {ArrayItem}
                </div>
              ))} 
            </div>
          </div>
          <div>
            Hamming distance(s):
            <div className="number-group">
              {distances &&
                distances.map((ArrayItem, idx) => (
                  <div className="hamming-group-item" key={idx}>
                    {ArrayItem}
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* GRAPH */}
        <div>
          <Graph data={graphData} />
        </div>
      </Grid>
    </Paper>
  );
}
