import { useState, useEffect } from "react";
import NamesList from "../NamesList/page";
import { shuffle } from "lodash";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material";

export default function MainPage() {
  const [names, setNames] = useState<string[]>([]);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [inputName, setInputName] = useState("");
  const [_lastIndex, setLastIndex] = useState<number | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

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
        component="main"
        maxWidth="md"
        sx={{
          mt: 4,
          mb: 4,
          borderRadius: 3,
          border: "1px solid white",
          p: 2,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            textAlign: "center",
            fontWeight: "bold",
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
              justifyContent: "space-between",
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              label="Ingresá un nombre"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              onKeyDown={handleKeyDown}
              margin="normal"
              InputLabelProps={{
                style: {
                  color: "rgb(var(--foreground-rgb))",
                },
              }}
              sx={{
                mb: 2,
                borderRadius: "20px",
                input: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddName}
              sx={{ borderRadius: "20px" }}
            >
              Agregar
            </Button>
          </Box>
          <Box
            sx={{
              width: isMobile ? "100%" : "30%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <NamesList names={names} onDelete={handleRemoveName} />
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClearNames}
              sx={{
                color: "white",
                borderColor: "white",
                borderRadius: "20px",
                width: "50%",
              }}
            >
              Vaciar
            </Button>
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
                width: "30%",
                backgroundColor: "#333",
                cursor: "pointer",
              }}
            >
              {`¡Le toca a ${selectedName}! `}
            </Typography>
          </Box>
        )}
      </Container>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
