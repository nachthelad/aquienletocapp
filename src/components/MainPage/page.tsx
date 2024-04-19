import { useState, useEffect } from "react";
import NamesList from "../NamesList/page";
import NameField from "../NameField/page";
import { shuffle } from "lodash";
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SnackbarMessage from "../Snackbar/page";

export default function MainPage() {
  const [names, setNames] = useState<string[]>([]);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [inputName, setInputName] = useState("");
  const [_lastIndex, setLastIndex] = useState<number | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const savedNames = localStorage.getItem("names");
    if (savedNames) {
      setNames(JSON.parse(savedNames));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("names", JSON.stringify(names));
  }, [names]);

  const handleAddName = () => {
    if (inputName) {
      setNames((prevNames) => {
        const updatedNames = [...prevNames, inputName];
        localStorage.setItem("names", JSON.stringify(updatedNames));
        return updatedNames;
      });
      setInputName("");
    } else {
      setSnackbarMessage("Ingresá un nombre");
      setOpenSnackbar(true);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddName();
    }
  };

  const handleRandomize = () => {
    if (names.length > 1) {
      let newNames = shuffle(names);
      let randomIndex = newNames.findIndex(
        (name: string | null) => name !== selectedName
      );
      setSelectedName(newNames[randomIndex]);
      setLastIndex(randomIndex);
    } else if (names.length === 1) {
      setSelectedName(names[0]);
      setLastIndex(0);
    } else {
      setSnackbarMessage("No hay nombres cargados");
      setOpenSnackbar(true);
    }
  };

  const handleClearNames = () => {
    localStorage.removeItem("names");
    setNames([]);
    setSelectedName(null);
  };

  const handleRemoveName = (index: number) => {
    const newNames = names.filter((_, i) => i !== index);
    setNames(newNames);
    localStorage.setItem("names", JSON.stringify(newNames));
    if (names.length === 2 || selectedName === names[index]) {
      handleRandomize();
    }
  };

  const handleClear = () => {
    setSelectedName(null);
  };

  return (
    <>
      <Container
        sx={{
          borderRadius: 3,
          border: isMobile ? "0" : "1px solid white",
          p: 2,
          my: isMobile ? 1 : 4,
          width: "80%",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontSize: "2rem",
            textAlign: "center",
            fontWeight: "bold",
            whiteSpace: "nowrap",
          }}
        >
          ¿A quién le toca?
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-around",
            alignItems: "flex-start",
            width: "100%",
            p: 2,
          }}
        >
          <Box
            sx={{
              width: isMobile ? "100%" : "30%",
              marginTop: "auto",
              marginBottom: "auto",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <NameField
              inputName={inputName}
              setInputName={setInputName}
              handleAddName={handleAddName}
              handleKeyDown={handleKeyDown}
            />
          </Box>
          <Box
            sx={{
              width: isMobile ? "100%" : "30%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <NamesList
              names={names}
              onDelete={handleRemoveName}
              handleClearNames={handleClearNames}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleRandomize}
            sx={{ borderRadius: "20px" }}
          >
            Elegir
          </Button>
        </Box>
        {selectedName && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
            onClick={handleClear}
          >
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2,
                color: "rgb(var(--foreground-rgb))",
                borderRadius: "5px",
                width: isMobile ? "100%" : "25%",
                backgroundColor: "#333",
                cursor: "pointer",
              }}
            >
              {`¡Le toca a ${selectedName}! `}
            </Typography>
          </Box>
        )}
      </Container>
      <SnackbarMessage
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        snackbarMessage={snackbarMessage}
      />
    </>
  );
}
