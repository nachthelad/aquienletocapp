import { Button, TextField } from "@mui/material";

type NameFieldProps = {
  inputName: string;
  setInputName: (name: string) => void;
  handleAddName: () => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function NameField({
  inputName,
  setInputName,
  handleAddName,
  handleKeyDown,
}: NameFieldProps) {
  return (
    <>
      <TextField
        fullWidth
        variant="outlined"
        label="Ingresá un nombre"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        onKeyDown={handleKeyDown}
        margin="normal"
        InputLabelProps={{
          style: { color: "rgb(var(--foreground-rgb))" },
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
    </>
  );
}
