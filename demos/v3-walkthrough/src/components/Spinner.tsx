import React from "react";

import "./Spinner.css";

export interface SpinnerProps {
  style?: React.CSSProperties;
}

function Spinner(props: SpinnerProps) {
  return (
    <div className="spinner" style={props.style} />
  );
}

export default Spinner;
