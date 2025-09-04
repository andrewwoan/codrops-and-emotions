import React from "react";

export const ConditionalMesh = ({ progress, showRange, children }) => {
  const [start, end] = showRange;
  const isVisible = progress >= start && progress <= end;

  return isVisible ? children : null;
};
