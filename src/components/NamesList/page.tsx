import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { Icon } from "@iconify/react";

type NamesListProps = {
  names: string[];
  onDelete: (index: number) => void;
  handleClearNames: () => void;
};

export default function NamesList({
  names,
  onDelete,
  handleClearNames,
}: NamesListProps) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <List
        dense={true}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {names.length > 0 ? (
          names.map((name, index) => (
            <ListItem
              key={index}
              onClick={() => onDelete(index)}
              sx={{
                borderRadius: "5px",
                margin: "5px",
                backgroundColor: "#333",
                cursor: "pointer",
                width: "80%",
              }}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onDelete(index)}
                  sx={{ color: "white" }}
                >
                  <Icon
                    icon="mingcute:delete-line"
                    width="1.3rem"
                    height="1.3rem"
                  />
                </IconButton>
              }
            >
              <ListItemText
                primary={name.charAt(0).toUpperCase() + name.slice(1)}
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="caption" sx={{ fontSize: "0.9rem" }}>
            Aún no hay nombres cargados.
          </Typography>
        )}
        {names.length > 1 && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClearNames}
            sx={{
              color: "white",
              borderColor: "white",
              borderRadius: "20px",
              width: "40%",
              mt: "5px",
            }}
          >
            Vaciar
          </Button>
        )}
      </List>
    </Box>
  );
}
