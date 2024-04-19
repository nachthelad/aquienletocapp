import React from "react";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { Icon } from "@iconify/react";

type NamesListProps = {
  names: string[];
  onDelete: (index: number) => void;
};

const NamesList: React.FC<NamesListProps> = ({ names, onDelete }) => {
  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <List dense={true}>
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
              <ListItemText primary={name} />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="Aún no hay nombres cargados." />
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default NamesList;
