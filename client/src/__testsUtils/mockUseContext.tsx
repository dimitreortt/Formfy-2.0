import React from "react";

type UseContextType = typeof React.useContext;

let realContext: UseContextType;
let mockContext: UseContextType;

export const mockUseContext = (jest: any) => {
  realContext = React.useContext;
  mockContext = React.useContext = jest.fn;
};

export const unMockUseContext = () => {
  React.useContext = realContext;
};
