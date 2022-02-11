import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps, AlertColor } from "@mui/material/Alert";
import { Box } from "@mui/system";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Props = {
  open: boolean;
  onClose: () => void;
  severity?: AlertColor;
};

export const AlertSnackbar: React.FunctionComponent<Props> = ({
  open,
  onClose,
  severity,
  children,
}) => {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    onClose();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          role="alert"
          onClose={handleClose}
          severity={severity || "error"}
          sx={{ width: "100%" }}
        >
          {children}
        </Alert>
      </Snackbar>
    </Box>
  );
};
