import React, { FunctionComponent, useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { SetFieldDialog } from "./SetFieldDialog";

type Props = {};

export const AddField: FunctionComponent<Props> = () => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <div>
      <IconButton
        aria-describedby={"add-field-button"}
        color="secondary"
        onClick={toggleOpen}
      >
        <AddIcon />
      </IconButton>
      <SetFieldDialog
        onClose={toggleOpen}
        open={open}
        selectedValue="username@gmail.com"
      />
      {/* <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover> */}
    </div>
  );
};
