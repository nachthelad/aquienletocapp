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
} from "@mui/material";

export default function MainPage() {
  const [names, setNames] = useState<string[]>([]);
  4;
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [inputName, setInputName] = useState("");
  const [_lastIndex, setLastIndex] = useState<number | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        mt: 4,
        mb: 4,
        borderRadius: 2,
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
            placeholder="Ingresá un nombre"
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
            sx={{ width: "100%", borderRadius: "20px" }}
          >
            Agregar
          </Button>
        </Box>
        <Box sx={{ width: isMobile ? "100%" : "30%" }}>
          <NamesList names={names} onDelete={handleRemoveName} />
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClearNames}
            sx={{
              mt: 2,
              width: "100%",
              color: "white",
              borderColor: "white",
              borderRadius: "20px",
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
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ mt: 2, textAlign: "center", color: "rgb(var(--foreground-rgb))" }}
      >
        {selectedName ? `A ${selectedName} le toca!` : ""}
      </Typography>
    </Container>
  );
}
