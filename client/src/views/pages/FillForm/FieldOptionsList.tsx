import React, { FunctionComponent } from "react";
import { Box } from "@mui/system";

type Props = {
  options: string[];
};

export const FieldOptionsList: FunctionComponent<Props> = ({ options }) => {
  return (
    <Box>
      {options.map((option) => (
        <Box key={option} sx={{ border: 0.1, padding: 0.5 }}>
          {option}
        </Box>
      ))}
    </Box>
  );
};
