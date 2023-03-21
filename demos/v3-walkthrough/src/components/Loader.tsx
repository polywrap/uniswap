import React from "react";
import "./Loader.css";

interface LoaderProps extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>, HTMLDivElement
> {

}

function Loader(props: LoaderProps) {
  return (
    /* CREDIT: https://tobiasahlin.com/spinkit/ */
    <div className="loader" {...props}>
      <div className="rect1"></div>
      <div className="rect2"></div>
      <div className="rect3"></div>
      <div className="rect4"></div>
      <div className="rect5"></div>
    </div>
  );
}

export default Loader;
