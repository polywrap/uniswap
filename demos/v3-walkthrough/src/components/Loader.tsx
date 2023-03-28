import React from "react";

import { ThemeContext } from "../context/ThemeProvider";

import "./Loader.css";

interface LoaderProps extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>, HTMLDivElement
> {
  rectStyle?: React.CSSProperties;
}

function Loader(props: LoaderProps) {
  const { theme } = React.useContext(ThemeContext);
  const rectStyle = props.rectStyle || {};
  rectStyle.backgroundColor =
    rectStyle.backgroundColor ||
    theme.colors[50];

  return (
    /* CREDIT: https://tobiasahlin.com/spinkit/ */
    <div className="loader" {...props}>
      <div className="rect1" style={rectStyle} />
      <div className="rect2" style={rectStyle} />
      <div className="rect3" style={rectStyle} />
      <div className="rect4" style={rectStyle} />
      <div className="rect5" style={rectStyle} />
    </div>
  );
}

export default Loader;
